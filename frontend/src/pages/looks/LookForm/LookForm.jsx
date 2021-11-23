import React, { Fragment, useState } from "react";
import { notification, Spin } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

import { looksStore } from "../looksStore";
import { postNewLook } from "./postNewLook";

import "./LookForm.css";

export const LookForm = (props) => {
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
        // Create Look entry
        const mediaUrl = res.data.imageUrl;
        const mediaUrlThumb = res.data.thumbUrl;
        const mediaUrlMedium = res.data.mediumUrl;
        const title = moment().format("DD.MM.YYYY");
        // post new Look
        postNewLook(mediaUrl, mediaUrlThumb, mediaUrlMedium, title)
          .then(() => {
            notification.success({
              message: `File uploaded successfully.`,
              placement: "bottomRight",
            });
            // retrigger parent component rendering
            looksStore.setIsOutOfDate(true);
            console.log("Success!");
          })
          .catch((error) => {
            notification.error({
              message: `File upload failed.`,
              placement: "bottomRight",
            });
            console.log(error.message);
          });
        setIsUploading(false);
      }
    } catch (err) {
      notification.error({
        message: `File upload failed.`,
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
              <CameraOutlined />
            </p>
            <p className="form-upload-text">Create Look</p>
            <p className="form-upload-hint">
              Start with a photo <br />
              Click, or drag here a file
            </p>
          </label>
        )}
      </form>
    </Fragment>
  );
};
