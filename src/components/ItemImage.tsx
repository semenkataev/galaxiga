import { useRef } from "react";
import { Item, isTier1Item } from "../types";
import styles from "./ItemImage.module.css";

export function ItemImage({
  className = "",
  item,
}: {
  className?: string;
  item: Item;
}) {
  const didErrorRef = useRef(false);

  return (
    <img
      alt={item.name}
      className={`${className} ${styles.Image}`}
      data-category={item.category}
      onError={({ target }) => {
        if (!didErrorRef.current) {
          didErrorRef.current = true;
          (target as HTMLImageElement).src = getUrl(item, "png");
        } else {
          (target as HTMLImageElement).src = "/images/fallback.png";
          (target as HTMLImageElement).setAttribute("data-not-found", "");
        }
      }}
      src={getUrl(item, "jpeg")}
    />
  );
}

function getUrl(item: Item, fileExtension: string) {
  return `/images/${item.category}s/tier_${isTier1Item(item) ? 1 : 2}_${
    item.id
  }.jpeg`;
}