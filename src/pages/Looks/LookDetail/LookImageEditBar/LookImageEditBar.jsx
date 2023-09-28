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

import { pictureRotate } from "../../actions/pictureRotate";
import { updateMedienLook } from "../../actions/updateMedienLook";
import { looksStore } from "../../looksStore";

import "./LookImageEditBar.less";

export const LookImageEditBar = observer(() => {
  const [isLoading, setIsLoading] = useState(false);

  const rotateHandler = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const resultFiles = await pictureRotate(
          looksStore.selectedLook.mediaUrl,
          1
        );
        await updateMedienLook(
          looksStore.selectedLook._id,
          resultFiles.UrlOriginalS3,
          resultFiles.UrlThumbS3,
          resultFiles.UrlMediumbS3
        );
        looksStore.setIsOutOfDate(true);
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
      </Tooltip>*/}
      {/* <Tooltip title="Change white balance">
        <FormatPainterOutlined />
      </Tooltip>*/}
      {/* <Tooltip title="Flip">
        <VerticalAlignMiddleOutlined className="imageEditBar__rotate90" />
      </Tooltip>*/}
      <div className="imageEditBar__imageEditBarItem" onClick={rotateHandler}>
        <Tooltip title="Rotate">
          {isLoading ? <LoadingOutlined /> : <RedoOutlined />}
        </Tooltip>
      </div>
    </div>
  );
});
