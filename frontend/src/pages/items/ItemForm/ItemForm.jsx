import React, { Fragment, useState } from "react";
import { notification, Spin } from "antd";
import { SkinOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { itemsStore } from "../itemsStore";
import { postNewItem } from "./postNewItem";

import "./ItemForm.css";

export const ItemForm = (props) => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);

  const fileSelectHandler = async (event) => {
    setIsUploading(true);
    submitHandler(event.target.files[0]);
  };

  const submitHandler = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + `/upload`,
        formData
      );
      if (res.data) {
        // Create Item entry
        const mediaUrl = res.data.imageUrl;
        const mediaUrlThumb = res.data.thumbUrl;
        const mediaUrlMedium = res.data.mediumUrl;
        const title = moment().format("DD.MM.YYYY");
        // post new Look
        postNewItem(mediaUrl, mediaUrlThumb, mediaUrlMedium, title)
          .then(() => {
            notification.success({
              message: t("items.uploadSuccess"),
              placement: "bottomRight",
            });
            // retrigger parent component rendering
            itemsStore.setIsOutOfDate(true);
            console.log("Success!");
          })
          .catch((error) => {
            notification.error({
              message: t("items.uploadFail"),
              placement: "bottomRight",
            });
            console.log(error.message);
          });
        setIsUploading(false);
      }
    } catch (err) {
      notification.error({
        message: t("items.uploadFail"),
        placement: "bottomRight",
      });
      setIsUploading(false);
      console.log(err);
    }
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler} style={{ marginBottom: "30px" }}>
        <input
          type="file"
          className="inputfile"
          name="inputfile"
          id="file"
          onChange={fileSelectHandler}
        />
        {isUploading ? (
          <label htmlFor="file">
            <Spin size="large" />
          </label>
        ) : (
          <label htmlFor="file">
            <p className="form-upload-drag-icon">
              <SkinOutlined />
            </p>
            <p className="form-upload-text">{t("items.addItem")}</p>
            <p className="form-upload-hint">
              {t("main.startWithPhoto")} <br />
              {t("main.clickDragFile")}
            </p>
          </label>
        )}
      </form>
    </Fragment>
  );
};
