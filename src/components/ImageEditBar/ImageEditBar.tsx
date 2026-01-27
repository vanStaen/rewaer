import React, { useState } from "react";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import {
  // BulbOutlined,
  // FormatPainterOutlined,
  UploadOutlined,
  RedoOutlined,
  VerticalAlignMiddleOutlined,
  LoadingOutlined,
  BorderOuterOutlined,
} from "@ant-design/icons";

import { pictureRotate } from "./pictureRotate";
import { pictureFlip } from "./pictureFlip";
import { updateMediaLook } from "./updateMediaLook";
import { updateMediaItem } from "./updateMediaItem";
import { looksStore } from "../../pages/Looks/looksStore";
import { itemsStore } from "../../pages/Items/itemsStore";
import { postPicture } from "@helpers/picture/postPicture";

import "./ImageEditBar.less";

interface ImageEditBarProps {
  page: "looks" | "items";
  loading?: boolean;
  error?: boolean;
  selectedElement: any;
}

export const ImageEditBar: React.FC<ImageEditBarProps> = observer(
  ({ page, loading, error, selectedElement }) => {
    const [isLoading, setIsLoading] = useState<boolean>(loading || false);

    const rotateHandler = async (): Promise<void> => {
      if (!isLoading) {
        setIsLoading(true);
        try {
          if (page === "looks") {
            const mediaId = await pictureRotate(
              selectedElement.mediaId,
              page,
              1,
            );
            await updateMediaLook(selectedElement.id, mediaId);
            looksStore.setIsOutOfDate(true);
          } else if (page === "items") {
            const mediaId = await pictureRotate(
              selectedElement.mediaId,
              page,
              1,
            );
            await updateMediaItem(selectedElement.id, mediaId);
            itemsStore.setIsOutOfDate(true);
          }
        } catch (e) {
          console.log(e);
        }
        setIsLoading(false);
      }
    };

    const flipHandler = async (isMirror: boolean): Promise<void> => {
      if (!isLoading) {
        setIsLoading(true);
        try {
          if (page === "looks") {
            const mediaId = await pictureFlip(
              selectedElement.mediaId,
              page,
              isMirror,
            );
            await updateMediaLook(selectedElement.id, mediaId);
            looksStore.setIsOutOfDate(true);
          } else if (page === "items") {
            const mediaId = await pictureFlip(
              selectedElement.mediaId,
              page,
              isMirror,
            );
            await updateMediaItem(selectedElement.id, mediaId);
            itemsStore.setIsOutOfDate(true);
          }
        } catch (e) {
          console.log(e);
        }
        setIsLoading(false);
      }
    };

    const fileSelectHandler = async (
      event: React.ChangeEvent<HTMLInputElement>,
    ): Promise<void> => {
      setIsLoading(true);
      if (event.target.files && event.target.files[0]) {
        replaceMediahandler(event.target.files[0]);
      }
    };

    const replaceMediahandler = async (file: File): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await postPicture(file, page);
        const mediaId = res.path;
        if (page === "looks") {
          await updateMediaLook(selectedElement.id, mediaId);
          looksStore.setIsOutOfDate(true);
        } else if (page === "items") {
          await updateMediaItem(selectedElement.id, mediaId);
          itemsStore.setIsOutOfDate(true);
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    const cropHandler = async (isCrop: boolean): Promise<void> => {
      // TODO: Implement crop functionality
    };

    return (
      <div className="imageEditBar__imageEditBar">
        {!error && (
          <>
            {/* <Tooltip title="Change luminosity">
        <BulbOutlined />
      </Tooltip> */}
            {/* <Tooltip title="Change white balance">
        <FormatPainterOutlined />
      </Tooltip> */}
            <div
              className="imageEditBar__imageEditBarItem"
              onClick={() => cropHandler(true)}
            >
              <Tooltip title="Crop">
                {isLoading ? (
                  <LoadingOutlined />
                ) : (
                  <BorderOuterOutlined />
                )}
              </Tooltip>
            </div>
            <div
              className="imageEditBar__imageEditBarItem"
              onClick={() => flipHandler(true)}
            >
              <Tooltip title="Flip">
                {isLoading ? (
                  <LoadingOutlined />
                ) : (
                  <VerticalAlignMiddleOutlined />
                )}
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
            <div
              className="imageEditBar__imageEditBarItem"
              onClick={rotateHandler}
            >
              <Tooltip title="Rotate">
                {isLoading ? <LoadingOutlined /> : <RedoOutlined />}
              </Tooltip>
            </div>
          </>
        )}
        <div className="imageEditBar__imageEditBarItem">
          <Tooltip title="Replace image">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="imageEditBar__form"
            >
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
  },
);
