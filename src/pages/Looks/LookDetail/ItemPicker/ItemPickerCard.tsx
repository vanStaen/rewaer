import React from "react";
import { Spin } from "antd";
import { useMediaUrl } from "@hooks/useMediaUrl";
import { Item } from "@type/itemTypes";

interface ItemPickerCardProps {
  item: Item;
  isSelected: boolean;
  isEdit: boolean;
  onClick: () => void;
}

export const ItemPickerCard: React.FC<ItemPickerCardProps> = ({
  item,
  isSelected,
  isEdit,
  onClick,
}) => {
  const [mediaUrl, isLoadingMedia, loadingMediaError] = useMediaUrl(
    item.mediaId,
    "items",
    "t",
  );

  const className = isEdit
    ? "itemPicker__itemEdit"
    : isSelected
      ? "itemPicker__itemSelected"
      : "itemPicker__item";

  if (isLoadingMedia) {
    return (
      <div className={className}>
        <div className="itemPicker__spinner">
          <Spin size="small" />
        </div>
      </div>
    );
  }

  if (loadingMediaError) {
    return (
      <div className={className} onClick={onClick}>
        <div className="itemPicker__error">!</div>
      </div>
    );
  }

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: `url(${mediaUrl})`,
      }}
    ></div>
  );
};
