import React from "react";
import { Image, Card, notification, Spin, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import EditableTitle from "../../../components/EditableTitle/EditableTitle";
import deleteItem from "./deleteItem";

import "./ItemCard.css";

const { Meta } = Card;

const ItemCard = (props) => {
  const spinnerFormated = (
    <div className="card__spinner">
      <Spin size="middle" />
    </div>
  );

  const handleDelete = () => {
    // delete Item
    deleteItem(props.item._id)
      .then(() => {
        notification.success({
          message: `Item deleted successfully.`,
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
          alt={props.item.title}
          src={props.item.mediaUrlThumb}
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
              title={props.item.title}
              id={props.item._id}
              type={"item"}
            />
            <Popconfirm
              title="Are you sure to delete this item?"
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

export default ItemCard;
