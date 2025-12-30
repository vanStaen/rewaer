import React, { useEffect, useState } from "react";
import { notification, Spin, Avatar } from "antd";
import {
  CameraOutlined,
  FileAddOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import moment from "moment";

import { looksStore } from "../../../pages/Looks/looksStore";
import { itemsStore } from "../../../pages/Items/itemsStore";
import { pageStore } from "@stores/pageStore/pageStore";
import { postNewLook } from "./postNewLook";
import { postNewItem } from "./postNewItem";
import { isElementVisible } from "@helpers/isElementVisible";
import { capitalizeFirstLetter } from "@helpers/capitalizeFirstLetter";
import { postPicture } from "@helpers/picture/postPicture";

import "./UploadForm.less";

interface UploadFormProps {
  page: string;
}

export const UploadForm = observer((props: UploadFormProps) => {
  const { page } = props;
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragDroping, setIsDragDroping] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<[number, number]>([
    0, 1,
  ]);

  const bucket = page;

  const fileSelectHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    await submitHandler(file);
  };

  const scrollhandler = () => {
    if (!pageStore.showOnlyFloatingUploadForm) {
      const elementForm = document.getElementById("upload-form");
      if (!isElementVisible(elementForm)) {
        pageStore.setShowFloatingUploadForm(true);
      } else {
        pageStore.setShowFloatingUploadForm(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollhandler);
    return () => {
      window.removeEventListener("scroll", scrollhandler);
    };
  }, []); // handler doesn't need to be in deps

  const submitHandler = async (file?: File) => {
    if (!file) return;
    try {
      const res: any = await postPicture(file, bucket);
      const mediaId = res?.path;
      if (mediaId) {
        const title = moment().format("DD.MM.YYYY");
        if (page === "looks") {
          postNewLook(mediaId, title).then(() => {
            notification.success({
              message: t("main.uploadSuccess"),
              placement: "bottomRight",
            });
            looksStore.setIsOutOfDate(true);
          });
        } else if (page === "items") {
          postNewItem(mediaId, title).then(() => {
            notification.success({
              message: t("main.uploadSuccess"),
              placement: "bottomRight",
            });
            itemsStore.setIsOutOfDate(true);
          });
        }
        setIsUploading(false);
      }
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
    const numberOfFiles = objectOfFiles.length;
    setUploadProgress([0, numberOfFiles]);
    for (let i = 0; i < numberOfFiles; i++) {
      setIsUploading(true);
      setUploadProgress([i, numberOfFiles]);
      const file = objectOfFiles[i];
      if (file) {
        // await each upload to preserve order/feedback
        // submitHandler handles errors and notification
        // eslint-disable-next-line no-await-in-loop
        await submitHandler(file);
      }
    }
    setUploadProgress([0, 0]);
    setIsUploading(false);
  };

  useEffect(() => {
    if (
      pageStore.showFloatingUploadForm ||
      pageStore.showOnlyFloatingUploadForm
    ) {
      const element = document.getElementById("upload-floating-form");
      if (element) {
        element.style.opacity = ".8";
      }
    }
  }, [pageStore.showFloatingUploadForm, pageStore.showOnlyFloatingUploadForm]);

  return (
    <>
      {(pageStore.showFloatingUploadForm ||
        pageStore.showOnlyFloatingUploadForm) && (
        <div className="upload-floating-form" id="upload-floating-form">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="file"
              className="inputfile"
              name="inputfile"
              id="file"
              onChange={fileSelectHandler}
            />
            <label
              htmlFor="file"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                size={64}
                icon={
                  isUploading ? (
                    <Spin size="large" />
                  ) : page === "looks" ? (
                    <CameraOutlined />
                  ) : (
                    <SkinOutlined />
                  )
                }
                className={
                  isUploading
                    ? "uploadForm__avatarIsUploading"
                    : "uploadForm__avatar"
                }
              />
            </label>
          </form>
        </div>
      )}
      {!pageStore.showOnlyFloatingUploadForm && (
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="upload-form"
            id="upload-form"
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
                <p className="form-upload-text" style={{ color: "#999" }}>
                  <br />
                  {uploadProgress[0] + 1} {t(`${page}.${page.slice(0, -1)}`)}{" "}
                  {t("main.of")} {uploadProgress[1]}
                </p>
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
                  {!isDragDroping
                    ? t("main.clickDragFile")
                    : t("main.dragDropMultiple")}
                </div>
              </label>
            )}
          </form>
        </div>
      )}
    </>
  );
});
