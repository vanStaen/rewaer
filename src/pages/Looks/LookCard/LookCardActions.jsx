import React from "react";
import { Popconfirm, Tooltip, notification } from "antd";
import { useTranslation } from "react-i18next";
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    HeartFilled,
    HeartOutlined,
    UndoOutlined,
    StopOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
} from "@ant-design/icons";

import { archiveLook } from "../actions/archiveLook";
import { deleteLook } from "../actions/deleteLook";
import { looksStore } from "../looksStore";
import { updateFavoriteLook } from "../actions/updateFavoriteLook";
import { updatePrivateLook } from "../actions/updatePrivateLook";

import './LookCard.css';

export const LookCardActions = (props) => {
    const { t } = useTranslation();

    const favoriteHandler = () => {
        updateFavoriteLook(props.look._id, !props.isFavorited);
        props.setIsFavorited(!props.isFavorited);
    };

    const privateHandler = () => {
        if (props.isPrivate) {
            looksStore.setNumberOfPrivateLook(looksStore.numberOfPrivateLook - 1);
        } else {
            looksStore.setNumberOfPrivateLook(looksStore.numberOfPrivateLook + 1);
        }
        updatePrivateLook(props.look._id, !props.isPrivate);
        props.setIsPrivate(!props.isPrivate);
    };

    const handleArchive = (value) => {
        archiveLook(props.look._id, value)
            .then(() => {
                notification.success({
                    message: value
                        ? t("looks.restoreSuccess")
                        : t("looks.archiveSuccess"),
                    placement: "bottomRight",
                    icon: value ? (
                        <UndoOutlined style={{ color: "green" }} />
                    ) : (
                        <StopOutlined style={{ color: "green" }} />
                    ),
                });
                looksStore.setIsOutOfDate(true);
            })
            .catch((error) => {
                notification.error({ message: `Error!`, placement: "bottomRight" });
                console.log(error.message);
            });
    };

    const handleDelete = () => {
        deleteLook(props.look._id)
            .then(() => {
                notification.success({
                    message: t("looks.deletedSuccess"),
                    placement: "bottomRight",
                    icon: <DeleteOutlined style={{ color: "green" }} />,
                });
                looksStore.setIsOutOfDate(true);
            })
            .catch((error) => {
                notification.error({ message: `Error!`, placement: "bottomRight" });
                console.log(error.message);
            });
    };

    return (
        <div
            className="lookcard__actionsContainer"
            id={`card_look_actionsContainer_${props.look._id}`}
        >
            <div
                className="lookcard__actionsLogo"
                id={`card_look_actionsLogo_${props.look._id}`}
            >
                {props.look.active ? (
                    <>
                        <Tooltip placement="left" title={t("main.markAsFavorite")}>
                            {props.isFavorited ? (
                                <HeartFilled
                                    className="iconRedHover"
                                    onClick={favoriteHandler}
                                />
                            ) : (
                                <HeartOutlined
                                    className="iconRedHover"
                                    onClick={favoriteHandler}
                                />
                            )}
                        </Tooltip>
                        {props.isPrivate ? (
                            <Tooltip placement="left" title={t("main.makePublic")}>
                                <EyeInvisibleOutlined
                                    className="iconGreenHover"
                                    onClick={privateHandler}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip placement="left" title={t("main.makePrivate")}>
                                <EyeOutlined
                                    className="iconGreenHover"
                                    onClick={privateHandler}
                                />
                            </Tooltip>
                        )}
                        <Tooltip placement="left" title={t("main.archive")}>
                            <Popconfirm
                                title={t("looks.archiveConfirm")}
                                onConfirm={() => handleArchive(false)}
                                okText={t("main.archive")}
                                cancelText={t("main.cancel")}
                                icon={
                                    <ExclamationCircleOutlined style={{ color: "black" }} />
                                }
                            >
                                <StopOutlined className="iconRedHover" />
                            </Popconfirm>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip placement="left" title={t("main.restore")}>
                            <Popconfirm
                                title={t("looks.restoreConfirm")}
                                onConfirm={() => handleArchive(true)}
                                okText={t("main.restore")}
                                cancelText={t("main.cancel")}
                                icon={
                                    <ExclamationCircleOutlined style={{ color: "black" }} />
                                }
                            >
                                <UndoOutlined className="iconGreenHover" />
                            </Popconfirm>
                        </Tooltip>
                        <Tooltip placement="left" title={t("main.delete")}>
                            <Popconfirm
                                title={t("looks.deleteConfirm")}
                                onConfirm={handleDelete}
                                okText={t("main.delete")}
                                cancelText={t("main.cancel")}
                                icon={
                                    <ExclamationCircleOutlined style={{ color: "black" }} />
                                }
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