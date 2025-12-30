import React, { useState, useEffect } from "react";
import { Modal, Avatar } from "antd";
import { CameraOutlined, SkinOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import { UploadForm } from "./UploadForm/UploadForm";
import { capitalizeFirstLetter } from "@helpers/capitalizeFirstLetter";
import { pageStore } from "@stores/pageStore/pageStore.js";
import { isElementVisible } from "@helpers/isElementVisible";

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
  }, []);

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

  const showFloatingform =
    pageStore.showFloatingUploadForm || pageStore.showOnlyFloatingUploadForm;

  return (
    <>
      {showFloatingform && (
        <div className="upload-floating-form" id="upload-floating-form">
          <Avatar
            onClick={showModal}
            size={64}
            icon={page === "looks" ? <CameraOutlined /> : <SkinOutlined />}
            className={"uploadForm__avatar"}
          />
        </div>
      )}
      <div onClick={showModal} className="upload-div" id="upload-form">
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
