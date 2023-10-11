import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  CameraOutlined,
  SkinOutlined,
} from "@ant-design/icons";

import { ProfileItems } from "../ProfileItems/ProfileItems";
import { ProfileLooks } from "../ProfileLooks/ProfileLooks";
import { profileStore } from "../../../stores/profileStore/profileStore";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="profil__subMenuContainer">
        <div
          className={`profil__subMenuItem ${
            props.contentToDisplay === "looks" && "profil__subMenuItemSelected"
          }`}
          onClick={() => {
            props.setContentToDisplay("looks");
            profileStore.setFilterIsPopingUp(true);
          }}
        >
          <CameraOutlined />
          <span className="profil__counter">
            {profileStore.looks && profileStore.looks.length}&nbsp;
            {t("menu.looks")}
          </span>
        </div>
        <div
          className={`profil__subMenuItem ${
            props.contentToDisplay === "items" && "profil__subMenuItemSelected"
          }`}
          onClick={() => {
            props.setContentToDisplay("items");
            profileStore.setFilterIsPopingUp(true);
          }}
        >
          <SkinOutlined />
          <span className="profil__counter">
            {profileStore.items && profileStore.items.length}&nbsp;
            {t("menu.items")}
          </span>
        </div>
      </div>
      <div className="profil__containerCenterContent">
        {props.contentToDisplay === "items" && <ProfileItems />}
        {props.contentToDisplay === "looks" && <ProfileLooks />}
        {props.contentToDisplay === "wall" && <>Nothing here yet</>}
      </div>
    </>
  );
});
