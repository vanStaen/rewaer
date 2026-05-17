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
import { useTranslation } from "react-i18next";

import { rotateHandler } from "./handlers/rotateHandler";
import { flipHandler } from "./handlers/flipHandler";
import { cropHandler } from "./handlers/cropHandler";
import { fileSelectHandler } from "./handlers/replaceHandler";

import "./ImageEditBar.less";

interface ImageEditBarProps {
  page: "looks" | "items";
  loading?: boolean;
  error?: boolean;
  selectedElement: any;
}

export const ImageEditBar: React.FC<ImageEditBarProps> = observer(
  ({ page, loading, error, selectedElement }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(loading || false);

    return (
      <>
        <div className="imageEditBar__imageEditBar">
          {!error && (
            <>
              <div
                className="imageEditBar__imageEditBarItem"
                onClick={() =>
                  cropHandler(page, selectedElement, isLoading, setIsLoading, t)
                }
              >
                <Tooltip title="Crop">
                  {isLoading ? <LoadingOutlined /> : <BorderOuterOutlined />}
                </Tooltip>
              </div>
              <div
                className="imageEditBar__imageEditBarItem"
                onClick={() =>
                  flipHandler(
                    page,
                    selectedElement,
                    true,
                    isLoading,
                    setIsLoading,
                  )
                }
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
                onClick={() =>
                  flipHandler(
                    page,
                    selectedElement,
                    false,
                    isLoading,
                    setIsLoading,
                  )
                }
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
                onClick={() =>
                  rotateHandler(page, selectedElement, isLoading, setIsLoading)
                }
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
                  onChange={(e) =>
                    fileSelectHandler(e, page, selectedElement, setIsLoading)
                  }
                />
                <label htmlFor="file">
                  {isLoading ? <LoadingOutlined /> : <UploadOutlined />}
                </label>
              </form>
            </Tooltip>
          </div>
        </div>
      </>
    );
  },
);
