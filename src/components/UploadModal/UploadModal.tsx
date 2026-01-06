import React, { useState, useEffect, use } from "react";
import { Modal, Avatar, notification, Button } from "antd";
import { CameraOutlined, SkinOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import moment from "moment";

import { looksStore } from "@pages/Looks/looksStore";
import { itemsStore } from "@pages/Items/itemsStore";
import { postNewLook } from "./UploadForm/postNewLook";
import { postNewItem } from "./UploadForm/postNewItem";
import { getPictureUrl } from "@helpers/picture/getPictureUrl";
import { deletePicture } from "@helpers/picture/deletePicture";

import { UploadForm } from "./UploadForm/UploadForm";
import { capitalizeFirstLetter } from "@helpers/capitalizeFirstLetter";
import { pageStore } from "@stores/pageStore/pageStore.js";
import { isElementVisible } from "@helpers/isElementVisible";
import { SimpleSubMenu } from "@components/SimpleSubMenu/SimpleSubMenu";

import "./UploadModal.less";
import { ItemForm } from "./ItemForm/ItemForm";

interface UploadProps {
  page: "looks" | "items";
}

// TODO: add should be translated
// TODO: menu click actions
// TODO: add button should be disabled if no mediaId

export const UploadModal = observer((props: UploadProps) => {
  const { page } = props;
  const [mediaId, setMediaId] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0);
  const { t } = useTranslation();

  const handlePostElement = () => {
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
    }
  };

  const imageLoadingHander = async (): Promise<void> => {
    const url = await getPictureUrl(mediaId, page, "t");
    const isloaded = new Promise<string>((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = url;
      loadImg.onload = () => resolve(url);
      loadImg.onerror = (err) => reject(err);
    });
    await isloaded;
    setMediaUrl(url);
  };

  useEffect(() => {
    mediaId && imageLoadingHander();
  }, [mediaId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await handlePostElement();
    setMediaId(null);
    setMediaUrl(null);
    setIsModalOpen(false);
  };

  const handleCancel = async () => {
    setIsModalOpen(false);
    if (mediaId) {
      await deletePicture(mediaId, page);
    }
    setMediaId(null);
    setMediaUrl(null);
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

  const menuLooks = [
    {
      icon: <CameraOutlined />,
      title: t("looks.createFromPicture"),
      action: () => {},
    },
    {
      icon: <SkinOutlined />,
      title: t("looks.createFromItems"),
      action: () => {},
    },
  ];

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
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={530}
        centered={true}
        footer={
          <div style={{ display: "flex", gap: "8px", width: "100%" }}>
            <Button key="cancel" onClick={handleCancel} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button
              key="Add"
              type="primary"
              onClick={handleOk}
              style={{ flex: 1 }}
            >
              Add
            </Button>
          </div>
        }
      >
        {page === "looks" && (
          <SimpleSubMenu
            menuItems={menuLooks}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        )}
        <div className="modal__container">
          {mediaUrl === null ? (
            <UploadForm page={page} setMediaId={setMediaId} />
          ) : (
            <div
              className="upload__picture"
              style={{ background: `url(${mediaUrl})` }}
            ></div>
          )}
        </div>
        <ItemForm />
      </Modal>
    </>
  );
});
