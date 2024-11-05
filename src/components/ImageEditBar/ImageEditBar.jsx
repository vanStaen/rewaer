import React, { useState } from "react";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import {
  BulbOutlined,
  FormatPainterOutlined,
  RedoOutlined,
  VerticalAlignMiddleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { pictureRotate } from "./pictureRotate";
import { pictureFlip } from "./pictureFlip";
import { updateMedienLook } from "./updateMedienLook";
import { updateMedienItem } from "./updateMedienItem";
import { looksStore } from "../../pages/Looks/looksStore";
import { itemsStore } from "../../pages/Items/itemsStore";

import "./ImageEditBar.less";

export const ImageEditBar = observer((props) => {
  const [isLoading, setIsLoading] = useState(false);

  const rotateHandler = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        if (props.page === "look") {
          const resultFiles = await pictureRotate(
            looksStore.selectedLook.mediaId,
            1,
          );
          await updateMedienLook(
            looksStore.selectedLook._id,
            resultFiles.UrlOriginalS3,
            resultFiles.UrlThumbS3,
            resultFiles.UrlMediumbS3,
          );
          looksStore.setIsOutOfDate(true);
        } else if (props.page === "item") {
          const resultFiles = await pictureRotate(
            itemsStore.selectedItem.mediaId,
            1,
          );
          await updateMedienItem(
            itemsStore.selectedItem._id,
            resultFiles.UrlOriginalS3,
            resultFiles.UrlThumbS3,
            resultFiles.UrlMediumbS3,
          );
          itemsStore.setIsOutOfDate(true);
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }
  };

  const flipHandler = async (isMirror) => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        if (props.page === "look") {
          const resultFiles = await pictureFlip(
            looksStore.selectedLook.mediaId,
            isMirror,
          );
          await updateMedienLook(
            looksStore.selectedLook._id,
            resultFiles.UrlOriginalS3,
            resultFiles.UrlThumbS3,
            resultFiles.UrlMediumbS3,
          );
          looksStore.setIsOutOfDate(true);
        } else if (props.page === "item") {
          const resultFiles = await pictureFlip(
            itemsStore.selectedItem.mediaId,
            isMirror,
          );
          await updateMedienItem(
            itemsStore.selectedItem._id,
            resultFiles.UrlOriginalS3,
            resultFiles.UrlThumbS3,
            resultFiles.UrlMediumbS3,
          );
          itemsStore.setIsOutOfDate(true);
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="imageEditBar__imageEditBar">
      {/* <Tooltip title="Change luminosity">
        <BulbOutlined />
      </Tooltip> */}
      {/* <Tooltip title="Change white balance">
        <FormatPainterOutlined />
      </Tooltip> */}{" "}
      <div
        className="imageEditBar__imageEditBarItem"
        onClick={() => flipHandler(true)}
      >
        <Tooltip title="Flip">
          {isLoading ? <LoadingOutlined /> : <VerticalAlignMiddleOutlined />}
        </Tooltip>
      </div>
      <div
        className="imageEditBar__imageEditBarItem"
        onClick={() => flipHandler(false)}
      >
        <Tooltip title="Mirror">
          {isLoading ? (
            <LoadingOutlined />
          ) : (
            <VerticalAlignMiddleOutlined className="imageEditBar__rotate90" />
          )}
        </Tooltip>
      </div>
      <div className="imageEditBar__imageEditBarItem" onClick={rotateHandler}>
        <Tooltip title="Rotate">
          {isLoading ? <LoadingOutlined /> : <RedoOutlined />}
        </Tooltip>
      </div>
    </div>
  );
});
