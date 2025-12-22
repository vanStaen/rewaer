import React from "react";
import { Popconfirm, Tooltip } from "antd";
import {
  DeleteOutlined,
  UndoOutlined,
  StopOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ElementCardActionsProps } from "./ElementCardTypes";

export const ElementCardActions: React.FC<ElementCardActionsProps> = ({
  elementId,
  isActive,
  isFavorited,
  isPrivate,
  onFavoriteToggle,
  onPrivateToggle,
  onArchive,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="elementcard__actionsContainer"
      id={`card_item_actionsContainer_${elementId}`}
    >
      <div
        className="elementcard__actionsLogo"
        id={`card_item_actionsLogo_${elementId}`}
      >
        {isActive ? (
          <>
            <Tooltip placement="left" title={t("main.markAsFavorite")}>
              {isFavorited ? (
                <HeartFilled
                  className="iconRedHover"
                  onClick={onFavoriteToggle}
                />
              ) : (
                <HeartOutlined
                  className="iconRedHover"
                  onClick={onFavoriteToggle}
                />
              )}
            </Tooltip>
            {isPrivate ? (
              <Tooltip placement="left" title={t("main.makePublic")}>
                <EyeInvisibleOutlined
                  className="iconGreenHover"
                  onClick={onPrivateToggle}
                />
              </Tooltip>
            ) : (
              <Tooltip placement="left" title={t("main.makePrivate")}>
                <EyeOutlined
                  className="iconGreenHover"
                  onClick={onPrivateToggle}
                />
              </Tooltip>
            )}
            <Tooltip placement="left" title={t("main.archive")}>
              <Popconfirm
                title={t("items.archiveConfirm")}
                onConfirm={() => onArchive(false)}
                okText={t("main.archive")}
                cancelText={t("main.cancel")}
              >
                <StopOutlined className="iconRedHover" />
              </Popconfirm>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip placement="left" title={t("main.restore")}>
              <Popconfirm
                title={t("items.restoreConfirm")}
                onConfirm={() => onArchive(true)}
                okText={t("main.restore")}
                cancelText={t("main.cancel")}
              >
                <UndoOutlined className="iconGreenHover" />
              </Popconfirm>
            </Tooltip>
            <Tooltip placement="left" title={t("main.delete")}>
              <Popconfirm
                title={t("items.deleteConfirm")}
                onConfirm={onDelete}
                okText={t("main.delete")}
                cancelText={t("main.cancel")}
              >
                <DeleteOutlined className="iconRedHover" />
              </Popconfirm>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};
