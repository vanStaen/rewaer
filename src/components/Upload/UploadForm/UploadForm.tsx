import React, { useState } from "react";
import { notification, Spin } from "antd";
import {
  CameraOutlined,
  FileAddOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import { pageStore } from "@stores/pageStore/pageStore";
import { postPicture } from "@helpers/picture/postPicture";

import "./UploadForm.less";

interface UploadFormProps {
  page: string;
  setMediaId: (path: string) => void;
}

export const UploadForm = observer((props: UploadFormProps) => {
  const { page, setMediaId } = props;
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragDroping, setIsDragDroping] = useState<boolean>(false);

  const bucket = page;

  const fileSelectHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    await submitHandler(file);
  };

  const submitHandler = async (file?: File) => {
    if (!file) return;
    try {
      const res: any = await postPicture(file, bucket);
      const mediaPath = res?.path;
      setMediaId(mediaPath);
      setIsUploading(false);
    } catch (err: any) {
      notification.error({
        message: t("main.uploadFail"),
        placement: "bottomRight",
      });
      setIsUploading(false);
      console.log(err);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragDroping(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragDroping(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const objectOfFiles = e.dataTransfer?.files;
    if (!objectOfFiles || objectOfFiles.length === 0) return;
    const file = objectOfFiles[0];
    if (file) {
      setIsUploading(true);
      await submitHandler(file);
    }
  };

  return (
    <>
      {!pageStore.showOnlyFloatingUploadForm && (
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="upload-form"
            style={
              isDragDroping
                ? { marginBottom: "30px", boxShadow: "0px 0px 7px 7px #dae4df" }
                : { marginBottom: "30px" }
            }
          >
            <input
              type="file"
              className="inputfile"
              name="inputfile"
              id="file"
              onChange={fileSelectHandler}
            />
            {isUploading ? (
              <label htmlFor="file" className="upload-form-label">
                <Spin size="large" />
                <div className="form-upload-text" style={{ color: "#999" }}>
                  <br />
                  {t("main.uploading")}
                </div>
              </label>
            ) : (
              <label
                htmlFor="file"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className="upload-form-label"
              >
                <div className="form-upload-drag-icon">
                  {isDragDroping ? (
                    <FileAddOutlined />
                  ) : page === "looks" ? (
                    <CameraOutlined />
                  ) : (
                    <SkinOutlined />
                  )}
                </div>
                <div className="form-upload-hint">
                  {t("main.startWithPhoto")} <br />
                  {t("main.clickDragFile")}
                </div>
              </label>
            )}
          </form>
        </div>
      )}
    </>
  );
});
