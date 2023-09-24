import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { itemsStore } from "../../Items/itemsStore";
import { looksStore } from "../looksStore";
import { userStore } from "../../../stores/userStore/userStore";
import { switchLook } from "./switchLook";
import { ItemPicker } from "./ItemPicker/ItemPicker";

import "./LookDetail.css";

export const LookDetail = observer(() => {
  const [displayPictureUrl, setDisplayPictureUrl] = useState(
    looksStore.selectedLook.mediaUrlMedium
  );
  const { t } = useTranslation();

  useEffect(() => {
    setDisplayPictureUrl(looksStore.selectedLook.mediaUrlMedium);
  }, [looksStore.selectedLook]);

  useEffect(() => {
    itemsStore.loadItems();
  }, [itemsStore.isOutOfDate]);

  useEffect(() => {
    window.addEventListener("keydown", keydownEventHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  const keydownEventHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "escape") {
      event.preventDefault();
      looksStore.setSelectedLook(null);
    } else if (keyPressed === "arrowleft") {
      event.preventDefault();
      switchLook(false, looksStore.showPrivateLooks);
    } else if (keyPressed === "arrowright") {
      event.preventDefault();
      switchLook(true, looksStore.showPrivateLooks);
    }
  };

  return (
    <div className="lookdetail__container">
      <div className="lookdetail__imageWrap">
        <div
          className="lookdetail__pictureBlur"
          id={`selected_look_picture_blur_${looksStore.selectedLook._id}`}
          style={{
            background: `url(${displayPictureUrl})`,
          }}
        ></div>
        <div
          className="lookdetail__picture"
          id={`selected_look_picture_${looksStore.selectedLook._id}`}
          style={{
            background: `url(${displayPictureUrl})`,
          }}
        ></div>
      </div>
      {/*
        <div className="lookDetail__actionContainer">
          <LookDetailFormRadio
            title="private"
            element="private"
            data={[
              { code: false, en: "Public", de: "Öffentlich", fr: "Publique" },
              { code: true, en: "Private", de: "Privat", fr: "Privé" },
            ]}
            value={isPrivate}
            flipValueTo={setIsPrivate}
            selectedLook={looksStore.selectedLook}
            whatShouldBeRed={true}
            multiSelect={false}
            disabled={!looksStore.selectedLook.active}
            tooltip={t("looks.makePrivateLook")}
          />
          <LookDetailFormRadio
            title="active"
            element="active"
            data={[
              { code: true, en: "Active", de: "Aktiv", fr: "Actif" },
              { code: false, en: "Archived", de: "Archiviert", fr: "Archivé" },
            ]}
            value={isActive}
            flipValueTo={setIsActive}
            selectedLook={looksStore.selectedLook}
            whatShouldBeRed={false}
            multiSelect={false}
            disabled={false}
            tooltip={t("looks.archiveLook")}
          />
        </div>
        */}

      <ItemPicker />
    </div>
  );
});
