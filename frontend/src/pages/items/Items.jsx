import React, { useState, useEffect } from "react";
import { Col, Row, Spin } from "antd";

import fetchItems from "./fetchItems";

import ItemCard from "./ItemCard/ItemCard";
import ItemForm from "./ItemForm/ItemForm";

import "./Items.css";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [isOutOfDate, setIsOutOfDate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadItems();
  }, [isOutOfDate]);

  const loadItems = async () => {
    try {
      const items = await fetchItems();
      setItems(items);
      setIsLoading(false);
      setIsOutOfDate(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const itemList = items.map((item) => {
    return (
      <Col key={item._id}>
        <ItemCard item={item} setIsOutOfDate={setIsOutOfDate} />
      </Col>
    );
  });

  return (
    <div>
      {error !== null ? (
        error
      ) : isLoading ? (
        <div className="looks__spinner">
          <Spin size="large" />
        </div>
      ) : (
        <Row justify={"space-around"}>
          <Col>
            <ItemForm setIsOutOfDate={setIsOutOfDate} />
          </Col>
          {itemList}
        </Row>
      )}
    </div>
  );
};

export default ItemsPage;
