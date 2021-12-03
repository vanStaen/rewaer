import React from "react";
import { Image, Card, notification, Spin, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { EditableTitle } from "../../../components/EditableTitle/EditableTitle";
import { looksStore } from "../looksStore";
import { deleteLook } from "./deleteLook";

import "./LookCard.css";

const { Meta } = Card;

export const LookCard = (props) => {
  const { t } = useTranslation();
  const spinnerFormated = (
    <div className="card__spinner">
      <Spin size="middle" />
    </div>
  );

  const handleDelete = () => {
    // delete Look
    deleteLook(props.look._id)
      .then(() => {
        notification.success({
          message: t("looks.deletedSuccess"),
          placement: "bottomRight",
          icon: <DeleteOutlined style={{ color: "green" }} />,
        });
        looksStore.setIsOutOfDate(true);
        console.log("Success!");
      })
      .catch((error) => {
        notification.error({ message: `Error!`, placement: "bottomRight" });
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="lookcard__container">
        <div
          className="lookcard__picture"
          //placeholder={spinnerFormated}
          style={{
            background: `url(${props.look.mediaUrlMedium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="lookcard__meta">
          <EditableTitle
            title={props.look.title}
            id={props.look._id}
            type={"look"}
          />
          <Popconfirm
            title={t("looks.deleteConfirm")}
            onConfirm={handleDelete}
            okText="Delete"
            cancelText="Cancel"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      </div>
    </>
  );
};
