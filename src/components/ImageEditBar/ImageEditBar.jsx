import React, { useState } from "react";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import {
  BulbOutlined,
  FormatPainterOutlined,
  UploadOutlined,
  RedoOutlined,
  VerticalAlignMiddleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { pictureRotate } from "./pictureRotate";
import { pictureFlip } from "./pictureFlip";
import { updateMediaLook } from "./updateMediaLook";
import { updateMediaItem } from "./updateMediaItem";
import { looksStore } from "../../pages/Looks/looksStore";
import { itemsStore } from "../../pages/Items/itemsStore";
import { postPicture } from "../../helpers/picture/postPicture";

import "./ImageEditBar.less";

export const ImageEditBar = observer(({ page }) => {
  const [isLoading, setIsLoading] = useState(false);

  const rotateHandler = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        if (page === "looks") {
          const resultFiles = await pictureRotate(
            looksStore.selectedLook.mediaId,
            1,
          );
          await updateMediaLook(
            looksStore.selectedLook.id,
            resultFiles.UrlOriginalS3,
            resultFiles.UrlThumbS3,
            resultFiles.UrlMediumbS3,
          );
          looksStore.setIsOutOfDate(true);
        } else if (page === "items") {
          const resultFiles = await pictureRotate(
            itemsStore.selectedItem.mediaId,
            1,
          );
          await updateMediaItem(
            itemsStore.selectedItem.id,
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
        if (page === "looks") {
          const resultFiles = await pictureFlip(
            looksStore.selectedLook.mediaId,
            isMirror,
          );
          // TODO FIX this
          await updateMediaLook(
            looksStore.selectedLook.id,
            resultFiles.UrlOriginalS3,
            resultFiles.UrlThumbS3,
            resultFiles.UrlMediumbS3,
          );
          looksStore.setIsOutOfDate(true);
        } else if (page === "items") {
          const resultFiles = await pictureFlip(
            itemsStore.selectedItem.mediaId,
            isMirror,
          );
          await updateMediaItem(
            itemsStore.selectedItem.id,
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

  const fileSelectHandler = async (event) => {
    setIsLoading(true);
    replaceMediahandler(event.target.files[0]);
  };

  const replaceMediahandler = async (file) => {
    setIsLoading(true);
    try {
      const res = await postPicture(file, page);
      const mediaId = res.path;
      if (page === "looks") {
        await updateMediaLook(looksStore.selectedLook.id, mediaId);
        looksStore.setIsOutOfDate(true);
      } else if (page === "items") {
        await updateMediaItem(itemsStore.selectedItem.id, mediaId);
        itemsStore.setIsOutOfDate(true);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <div className="imageEditBar__imageEditBar">
      {/* <Tooltip title="Change luminosity">
        <BulbOutlined />
      </Tooltip> */}
      {/* <Tooltip title="Change white balance">
        <FormatPainterOutlined />
      </Tooltip> */}
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
      <div className="imageEditBar__imageEditBarItem">
        <Tooltip title="Replace image">
          <form onSubmit={replaceMediahandler} className="imageEditBar__form">
            <input
              type="file"
              className="imageEditBar__inputfile"
              name="inputfile"
              id="file"
              onChange={fileSelectHandler}
            />
            <label htmlFor="file">
              {isLoading ? <LoadingOutlined /> : <UploadOutlined />}
            </label>
          </form>
        </Tooltip>
      </div>
    </div>
  );
});
