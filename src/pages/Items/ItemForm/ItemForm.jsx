import React, { useEffect, useState } from "react";
import { Avatar, notification, Spin, Col } from "antd";
import { SkinOutlined, FileAddOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import axios from "axios";
import moment from "moment";

import { itemsStore } from "../itemsStore";
import { pageStore } from "../../../stores/pageStore/pageStore";
import { postNewItem } from "./postNewItem";
import { isElementVisible } from "../../../helpers/isElementVisible";

import "./ItemForm.css";

export const ItemForm = observer(() => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragDroping, setIsDragDroping] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([0, 0]);

  const fileSelectHandler = async (event) => {
    setIsUploading(true);
    submitHandler(event.target.files[0]);
  };

  const scrollhandler = () => {
    if (!pageStore.showOnlyFloatingForm) {
      const elementForm = document.getElementById("item-form");
      if (!isElementVisible(elementForm)) {
        pageStore.setShowFloatingForm(true);
      } else {
        pageStore.setShowFloatingForm(false);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollhandler);
    return () => {
      window.removeEventListener("scroll", scrollhandler);
    };
  }, [scrollhandler]);

  const submitHandler = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(process.env.API_URL + `/upload`, formData);
      if (res.data) {
        // Create Item entry
        const mediaUrl = res.data.imageUrl;
        const mediaUrlThumb = res.data.thumbUrl;
        const mediaUrlMedium = res.data.mediumUrl;
        const title = moment().format("DD.MM.YYYY");
        // post new Item
        postNewItem(mediaUrl, mediaUrlThumb, mediaUrlMedium, title)
          .then(() => {
            notification.success({
              message: t("main.uploadSuccess"),
              placement: "bottomRight",
            });
            // retrigger parent component rendering
            itemsStore.setIsOutOfDate(true);
            console.log("Success!");
          })
          .catch((error) => {
            notification.error({
              message: t("main.uploadFail"),
              placement: "bottomRight",
            });
            console.log(error.message);
          });
        setIsUploading(false);
      }
    } catch (err) {
      notification.error({
        message: t("main.uploadFail"),
        placement: "bottomRight",
      });
      setIsUploading(false);
      console.log(err);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragDroping(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragDroping(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const objectOfFiles = e.dataTransfer.files;
    const numberOfFiles = objectOfFiles.length;
    setUploadProgress([0, numberOfFiles]);
    for (let i = 0; i < numberOfFiles; i++) {
      setIsUploading(true);
      setUploadProgress([i, numberOfFiles]);
      if (objectOfFiles[i]) {
        const file = objectOfFiles[i];
        await submitHandler(file);
      }
    }
    setUploadProgress([0, 0]);
    setIsUploading(false);
  };

  useEffect(() => {
    if (pageStore.showFloatingForm) {
      const element = document.getElementById("item-floating-form")
      element.style.opacity = '.8';
    }
  }, [pageStore.showFloatingForm])

  return (<>
    {(pageStore.showFloatingForm || pageStore.showOnlyFloatingForm) &&
      (<div className="item-floating-form" id="item-floating-form">
        <form
          onSubmit={submitHandler}
        >
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
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            style={{ cursor: 'pointer' }}
          >
            <Avatar
              size={64}
              icon={<SkinOutlined />}
              style={{ backgroundColor: 'IndianRed' }}
            />
          </label>
        </form>
      </div>)}
    {!pageStore.showOnlyFloatingForm && <Col>
      <form
        onSubmit={submitHandler}
        id="item-form"
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
          <label htmlFor="file" className="item-form-label">
            <Spin size="large" />
            <p className="form-upload-text" style={{ color: "#999" }}>
              <br />
              {uploadProgress[0] + 1} {t("items.item")} {t("main.of")}{" "}
              {uploadProgress[1]}
            </p>
          </label>
        ) : (
          <label
            htmlFor="file"
            className="item-form-label"
            onDrop={handleDrop}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >
            <p className="form-upload-drag-icon">
              {isDragDroping ? <FileAddOutlined /> : <SkinOutlined />}
            </p>
            <p className="form-upload-text">{t("items.addItem")}</p>
            <p className="form-upload-hint">
              {t("main.startWithPhoto")} <br />
              {!isDragDroping
                ? t("main.clickDragFile")
                : t("main.dragDropMultiple")}
            </p>
          </label>
        )}
      </form>
    </Col>}
  </>);
});
