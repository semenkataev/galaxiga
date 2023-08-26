import { useMemo } from "react";
import { Card } from "../components/Card";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { ItemImage } from "../components/ItemImage";
import { TIER_1_DRONES } from "../data/drones";
import { TIER_1_SHIPS } from "../data/ships";
import { Category, Tier1Item, Tier2Item } from "../types";
import { Tier1ItemUpgrade } from "./Tier1ItemUpgrade";

import useLocalStorage from "../hooks/useLocalStorage";
import { formatNumber } from "../utils/number";
import styles from "./Tier2ItemUpgrade.module.css";
import { Cost, calculateCost } from "./calculateCost";
import { useTier1ItemStats } from "./useTier1ItemStats";
import { Icon } from "../components/Icon";
import { TIER_1_STONES } from "../data/stones";

export function Tier2ItemUpgrade({
  category,
  tier2Item,
}: {
  category: Category;
  tier2Item: Tier2Item;
}) {
  const [item1Stats] = useTier1ItemStats(tier2Item.createdByMerging[0]);
  const [item2Stats] = useTier1ItemStats(tier2Item.createdByMerging[1]);
  const [numGenericCards] = useLocalStorage<number>(
    `num-generic-${category}-cards`,
    0
  );
  const [buyCards] = useLocalStorage<boolean>("buy-cards-with-gems", false);

  const costForItem1 = useMemo<Cost>(
    () => calculateCost(item1Stats, category),
    [category, item1Stats]
  );
  const costForItem2 = useMemo<Cost>(
    () => calculateCost(item2Stats, category),
    [category, item2Stats]
  );

  const cannotSafelyEstimate =
    !costForItem1.isEstimateComplete || !costForItem2.isEstimateComplete;

  const isComplete =
    costForItem1.coinsNeeded === 0 && costForItem2.coinsNeeded === 0;

  // The generic cards will have already been factored into both item costs
  // but they can only be spent once, so add the on top again here
  const cardsNeeded = Math.max(
    0,
    costForItem1.cardsNeeded + costForItem2.cardsNeeded - numGenericCards
  );
  const coinsNeeded = costForItem1.coinsNeeded + costForItem2.coinsNeeded;

  const gemsNeededToMerge = category === "drone" ? 250 : 500;
  let gemsNeeded =
    costForItem1.gemsNeeded.forLevels +
    costForItem2.gemsNeeded.forLevels +
    gemsNeededToMerge;
  if (buyCards) {
    const costPerBox = category === "drone" ? 140 : 280;
    gemsNeeded += Math.ceil(cardsNeeded / 50) * costPerBox;
  }

  let tier1Items: Tier1Item[];
  switch (category) {
    case "drone":
      tier1Items = TIER_1_DRONES;
      break;
    case "ship":
      tier1Items = TIER_1_SHIPS;
      break;
    case "stone":
      tier1Items = TIER_1_STONES;
      break;
  }

  return (
    <div className={styles.Container} data-complete={isComplete || undefined}>
      <div className={styles.Description}>
        <ItemImage
          category={category}
          className={styles.Image}
          item={tier2Item}
        />
        <div
          className={styles.Column}
          data-is-complete={isComplete || undefined}
        >
          <div className={styles.Name}>{tier2Item.name}</div>
          <div className={styles.Costs}>
            {cannotSafelyEstimate && (
              <div title="Estimate might not include cost of acquiring all tier 1 items">
                <Icon className={styles.CannotSafelyEstimate} type="warn" />
              </div>
            )}
            <div
              className={styles.Cost}
              data-disabled={buyCards || undefined}
              title={
                buyCards
                  ? undefined
                  : `${formatNumber(cardsNeeded, "long")} cards`
              }
            >
              <Card type="generic" category={category} />
              {buyCards ? "N/A" : formatNumber(cardsNeeded)}
            </div>
            <div
              className={styles.Cost}
              title={`${formatNumber(gemsNeeded, "long")} gems`}
            >
              <Gem /> {formatNumber(gemsNeeded)}
            </div>
            <div
              className={styles.Cost}
              title={`${formatNumber(coinsNeeded, "long")} coins`}
            >
              <Coin /> {formatNumber(coinsNeeded)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ItemContainer}>
        {tier2Item.createdByMerging.map((id) => {
          const tier1Item = tier1Items.find((item) => item.id === id)!;

          return (
            <Tier1ItemUpgrade
              category={category}
              key={id}
              tier1Item={tier1Item}
            />
          );
        })}
      </div>
    </div>
  );
}
