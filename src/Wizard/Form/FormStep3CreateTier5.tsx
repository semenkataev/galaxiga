import { IconButton } from "../../components/IconButton";
import { ItemImage } from "../../components/ItemImage";
import { DEFAULT_ITEM_STATS, Item } from "../../types";
import { PendingCreateTier5Item } from "../types";
import styles from "./shared.module.css";

export function FormStep3CreateTier5({
  goToNextStep,
  goToPreviousStep,
  items,
  onDismiss,
  pendingAction,
}: {
  goToNextStep: (value?: PendingCreateTier5Item) => void;
  goToPreviousStep: () => void;
  items: Item[];
  onDismiss: () => void;
  pendingAction: PendingCreateTier5Item;
}) {
  const { category } = pendingAction;

  return (
    <div className={styles.Form}>
      <div className={styles.Prompt}>
        Which {category} would you like to create?
      </div>
      <div className={styles.OptionList}>
        {items.map((item) => (
          <button
            className={styles.OptionsItemButton}
            key={item.id}
            onClick={() =>
              goToNextStep({
                ...pendingAction,
                itemStats: DEFAULT_ITEM_STATS,
                primaryItem: item,
              })
            }
          >
            <ItemImage className={styles.OptionsItemButtonImage} item={item} />
            {item.name}
          </button>
        ))}
      </div>

      <div className={styles.Spacer} />

      <div className={styles.OptionColumn}>
        <IconButton iconType="previous" onClick={goToPreviousStep} />
        <button className={styles.CancelButton} onClick={onDismiss}>
          Cancel
        </button>
        <IconButton
          disabled={!pendingAction.primaryItem}
          iconType="next"
          onClick={() => goToNextStep()}
        />
      </div>
    </div>
  );
}
