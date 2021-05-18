import React from "react";
import { useState } from "react";
import { Input, notification } from "antd";
import patchTitle from "./patchTitle";
import "./EditableTitle.css";

const EditableTitle = (props) => {
  const [title, setTitle] = useState(
    props.title.replace(/ /g, "").length > 23
      ? `${props.title.replace("-", "/").replace(/ /g, "").slice(0, 23)}...`
      : props.title.replace("-", "/").replace(/ /g, "")
  );
  const [isEditMode, setIsEditmode] = useState(false);
  const [editInputValue, setEditInputValue] = useState(
    props.title.replace("-", "/")
  );

  const patchTitleInDB = (title) => {
    // fetch Entries
    patchTitle(title, props.id, props.type).catch((error) => {
      notification.error({ description: `Unauthorized! Please login.` });
      console.log("error", error.message);
    });
  };

  const handleEditChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditCancel = () => {
    setIsEditmode(false);
    setEditInputValue(props.title.replace("-", "/"));
    console.log("cancel");
  };

  const handleEditConfirm = () => {
    patchTitleInDB(editInputValue.replace("/", "-"));
    setTitle(
      editInputValue.replace(/ /g, "").length > 23
        ? `${editInputValue
            .replace("-", "/")
            .replace(/ /g, "")
            .slice(0, 23)}...`
        : editInputValue.replace("-", "/").replace(/ /g, "")
    );
    setIsEditmode(false);
  };

  return (
    <div>
      {isEditMode ? (
        <Input
          key={`title_input_${props.id}`}
          size="small"
          className="title__input"
          value={editInputValue}
          onChange={handleEditChange}
          onBlur={handleEditCancel}
          onPressEnter={handleEditConfirm}
        />
      ) : (
        <div
          className="Page__title"
          onDoubleClick={() => {
            setIsEditmode(true);
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default EditableTitle;
