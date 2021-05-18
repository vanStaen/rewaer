import React from "react";
import { Image, Card, notification, Spin, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import EditableTitle from "../../../components/EditableTitle/EditableTitle";
import deleteLook from "./deleteLook";

import "./LookCard.css";

const { Meta } = Card;

const LookCard = (props) => {
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
          message: `Look deleted successfully.`,
          placement: "bottomRight",
          icon: <DeleteOutlined style={{ color: "green" }} />,
        });
        props.setIsOutOfDate(true);
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
          alt={props.look.title}
          src={props.look.mediaUrlThumb}
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
              title={props.look.title}
              id={props.look._id}
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

export default LookCard;
