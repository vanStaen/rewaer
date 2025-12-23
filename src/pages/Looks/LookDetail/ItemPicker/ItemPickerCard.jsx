import React from "react";
import { Spin } from "antd";
import { useMediaUrl } from "../../../../hooks/useMediaUrl";

export const ItemPickerCard = ({ item, isSelected, onClick }) => {
  const [mediaUrl, isLoadingMedia, loadingMediaError] = useMediaUrl(
    item.mediaId,
    "items",
    "t"
  );

  const className = isSelected
    ? "itemPicker__itemSelected"
    : "itemPicker__item";

  if (isLoadingMedia) {
    return (
      <div className={className} onClick={onClick}>
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
