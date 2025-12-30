import React, { useState } from "react";
import { Modal } from "antd";
import { CameraOutlined, SkinOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import { UploadForm } from "./UploadForm/UploadForm";
import { capitalizeFirstLetter } from "@helpers/capitalizeFirstLetter";

import "./Upload.less";

interface UploadProps {
  page: string;
}

export const Upload = observer((props: UploadProps) => {
  const { page } = props;
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal} className="upload-div">
        <div className="upload-icon">
          {page === "looks" ? <CameraOutlined /> : <SkinOutlined />}
        </div>
        <div className="upload-text">
          {t(`${page}.add${capitalizeFirstLetter(page.slice(0, -1))}`)}
        </div>
        <div className="upload-hint">
          {t("main.startWithPhoto")} <br />
        </div>
      </div>
      <Modal
        title={t(`${page}.addNew${capitalizeFirstLetter(page.slice(0, -1))}`)}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <UploadForm page={page} />
      </Modal>
    </>
  );
});
