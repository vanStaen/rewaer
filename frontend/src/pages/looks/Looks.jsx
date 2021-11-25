import React, { useEffect, useState } from "react";
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
  const [quickEdit, setQuickEdit] = useState(false);
  const [multiEdit, setMultiEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
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
              <Tooltip
                placement="topRight"
                title={quickEdit ? "Hide quick edits" : "Show quick edits"}
              >
                <EditOutlined
                  className={
                    quickEdit
                      ? "looks__toolbarIcon looks__toolbarIconActive"
                      : "looks__toolbarIcon"
                  }
                  onClick={() => {
                    setQuickEdit(!quickEdit);
                  }}
                />
              </Tooltip>
              <Tooltip
                placement="topRight"
                title={
                  multiEdit
                    ? "Deactivate multiselect edits"
                    : "Activate multiselect edits"
                }
              >
                <CopyOutlined
                  className={
                    multiEdit
                      ? "looks__toolbarIcon looks__toolbarIconActive"
                      : "looks__toolbarIcon"
                  }
                  onClick={() => {
                    setMultiEdit(!multiEdit);
                  }}
                />
              </Tooltip>
              <Tooltip
                placement="topRight"
                title={showFilter ? "Hide filter panel" : "Show filter panel"}
              >
                <FilterOutlined
                  className={
                    showFilter
                      ? "looks__toolbarIcon looks__toolbarIconActive"
                      : "looks__toolbarIcon"
                  }
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                />
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
