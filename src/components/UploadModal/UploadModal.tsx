import React, { useState, useEffect } from "react";
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
import { ItemInput } from "@type/itemTypes";
import { LookInput } from "@type/lookTypes";
import { ItemForm } from "./ItemForm/ItemForm";
import { LookForm } from "./LookForm/LookForm";
import { LookFromItemsForm } from "./LookFromItemsForm/LookFromItemsForm";

import "./UploadModal.less";

interface UploadProps {
  page: "looks" | "items";
}

export const UploadModal = observer((props: UploadProps) => {
  const { page } = props;
  const { t } = useTranslation();

  const [mediaId, setMediaId] = useState<string>("");
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(0);

  const [itemInput, setItemInput] = useState<ItemInput>({});
  const [lookInput, setLookInput] = useState<LookInput>({});

  const handlePostElement = async () => {
    if (mediaId) {
      const title = moment().format("DD.MM.YYYY");
      if (page === "looks") {
        await postNewLook(mediaId, title).then(() => {
          notification.success({
            message: t("looks.lookAdded"),
            placement: "bottomRight",
          });
          looksStore.setIsOutOfDate(true);
        });
      } else if (page === "items") {
        await postNewItem({ ...itemInput, mediaId }).then(() => {
          notification.success({
            message: t("items.itemAdded"),
            placement: "bottomRight",
          });
          itemsStore.setIsOutOfDate(true);
        });
      }
    }
  };

  const imageLoadingHander = async (): Promise<void> => {
    try {
      const url = await getPictureUrl(mediaId, page, "t");
      const isloaded = new Promise<string>((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = url;
        loadImg.onload = () => resolve(url);
        loadImg.onerror = (err) => reject(err);
      });
      await isloaded;
      setMediaUrl(url);
    } catch (err) {
      notification.error({
        message: t("main.error"),
        description: t("main.errorLoadingImage"),
        placement: "bottomRight",
      });
      console.error(err);
    }
  };

  useEffect(() => {
    if (mediaId) {
      imageLoadingHander();
    }
  }, [mediaId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await handlePostElement();
    setMediaId("");
    setMediaUrl("");
    setItemInput({});
    setLookInput({});
    setIsModalOpen(false);
  };

  const handleCancel = async () => {
    setIsModalOpen(false);
    if (mediaId) {
      await deletePicture(mediaId, page);
    }
    setMediaId("");
    setMediaUrl("");
    setItemInput({});
    setLookInput({});
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

  const addButtonDisabled = () => {
    if (page === "looks") {
      return !lookInput.title || !mediaId;
    } else if (page === "items") {
      return !itemInput.title || !itemInput.category || !mediaId;
    }
  };

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

  const menuItems = [
    {
      icon: <SkinOutlined />,
      title: t("items.addNewItem"),
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
        width={selectedMenuItem === 0 ? 530 : 800}
        centered={true}
        footer={
          <div style={{ display: "flex", gap: "8px", width: "100%" }}>
            <Button key="cancel" onClick={handleCancel} style={{ flex: 1 }}>
              {t("main.cancel")}
            </Button>
            <Button
              key="Add"
              type="primary"
              onClick={handleOk}
              style={{ flex: 1 }}
              disabled={addButtonDisabled()}
            >
              {t("main.add")}
            </Button>
          </div>
        }
      >
        {page === "looks" ? (
          <SimpleSubMenu
            menuItems={menuLooks}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        ) : (
          <SimpleSubMenu
            menuItems={menuItems}
            selectedMenuItem={selectedMenuItem}
            setSelectedMenuItem={setSelectedMenuItem}
          />
        )}
        <div className="modal__container">
          {selectedMenuItem === 0 ? (
            <>
              {!mediaUrl ? (
                <UploadForm page={page} setMediaId={setMediaId} />
              ) : (
                <div
                  className="upload__picture"
                  style={{ background: `url(${mediaUrl})` }}
                ></div>
              )}
              {page === "looks" ? (
                <LookForm setLookInput={setLookInput} />
              ) : (
                <ItemForm setItemInput={setItemInput} />
              )}
            </>
          ) : (
            <>
              <LookFromItemsForm />
              <LookForm setLookInput={setLookInput} />
            </>
          )}
        </div>
      </Modal>
    </>
  );
});
