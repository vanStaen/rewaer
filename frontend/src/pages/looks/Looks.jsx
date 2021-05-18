import React, { useState, useEffect } from "react";
import { Col, Row, Spin } from "antd";

import fetchLooks from "./fetchLooks";

import LookCard from "./LookCard/LookCard";
import LookForm from "./LookForm/LookForm";

import "./Looks.css";

const LooksPage = () => {
  const [looks, setLooks] = useState([]);
  const [isOutOfDate, setIsOutOfDate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLooks();
  }, [isOutOfDate]);

  // Use Callback
  /* mobx store
  @observable
  looks
  isloading
  isOutOfDate
  @action
  loadLooks(){ 
    loadlooks() 
    set hier the looks
    // await -> run_in_action  
  }
  */

  const loadLooks = async () => {
    try {
      const looks = await fetchLooks();
      setLooks(looks);
      setIsLoading(false);
      setIsOutOfDate(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const lookList = looks.map((look) => {
    return (
      <Col key={look._id}>
        <LookCard look={look} setIsOutOfDate={setIsOutOfDate} />
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
            <LookForm setIsOutOfDate={setIsOutOfDate} />
          </Col>
          {lookList}
        </Row>
      )}
    </div>
  );
};

export default LooksPage;
