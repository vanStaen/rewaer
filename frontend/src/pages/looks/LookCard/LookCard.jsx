import React from "react";
import { Image, Card, notification, Spin, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import EditableTitle from "../../../components/EditableTitle/EditableTitle";
import { looksStore } from "../looksStore";
import deleteLook from "./deleteLook";

import "./LookCard.css";

const { Meta } = Card;

export const LookCard = (props) => {
  const spinnerFormated = (
    <div className="card__spinner">
      <Spin size="middle" />
    </div>
  );

  const handleDelete = () => {
    // delete Look
    deleteLook(looksStore.look._id)
      .then(() => {
        notification.success({
          message: `Look deleted successfully.`,
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
    <Card
      hoverable
      bordered
      style={{ width: 240, marginBottom: 30, height: 385 }}
      cover={
        <Image
          alt={looksStore.look.title}
          src={looksStore.look.mediaUrlThumb}
          placeholder={spinnerFormated}
          width={240}
          height={320}
        />
      }
    >
      <Meta
        title={
          <div>
            <EditableTitle
              title={looksStore.look.title}
              id={looksStore.look._id}
              type={"look"}
            />
            <Popconfirm
              title="Are you sure to delete this look?"
              onConfirm={handleDelete}
              okText="Delete"
              cancelText="Cancel"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        }
      />
    </Card>
  );
};
