import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Col, Row, Spin, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined, CopyOutlined, FilterOutlined } from "@ant-design/icons";

import { looksStore } from "./looksStore";
import { MenuBar } from "../../components/MenuBar/MenuBar";
import { LookCard } from "./LookCard/LookCard";
import { LookForm } from "./LookForm/LookForm";

import "./Looks.css";

export const Looks = observer(() => {
  useEffect(() => {
    looksStore.loadLooks();
  }, [looksStore.isOutOfDate]);

  const lookList = looksStore.looks.map((look) => {
    return (
      <Col key={look._id}>
        <LookCard look={look} />
      </Col>
    );
  });

  return (
    <div className="looks__main">
      <MenuBar />
      {looksStore.error !== null ? (
        looksStore.error
      ) : looksStore.isLoading ? (
        <div className="looks__spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="looks__container">
          <div className="looks__toolbar">
            <div className="looks__toolbarLeft">
              {looksStore.looks.length} looks
            </div>
            <div className="looks__toolbarRight">
              <Tooltip placement="topRight" title="Show quick edits">
                <EditOutlined className="looks__toolbarIcon" />
              </Tooltip>
              <Tooltip placement="topRight" title="Activate multiselect edits">
                <CopyOutlined className="looks__toolbarIcon looks__toolbarIconActive" />
              </Tooltip>
              <Tooltip placement="topRight" title="Filter the looks">
                <FilterOutlined className="looks__toolbarIcon" />
              </Tooltip>
            </div>
          </div>
          <Row justify={"space-around"}>
            <Col>
              <LookForm />
            </Col>
            {lookList}
          </Row>
        </div>
      )}
    </div>
  );
});
