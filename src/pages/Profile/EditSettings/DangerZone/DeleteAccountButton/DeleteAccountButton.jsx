import React, { useState } from "react";
import { Button, notification } from "antd";
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { authStore } from "../../../../../stores/authStore/authStore";
import { archiveAccount } from "../../actions/archiveAccount.js";

import "./DeleteAccountButton.css";

//TOFO : test this component

export const DeleteAccountButton = () => {
  const { t } = useTranslation();
  const [showAreYouSureButton, setShowAreYouSureButton] = useState(false);
  const [secondsBeforeDisapearing, setSecondsBeforeDisapearing] = useState(0);

  const areYouSureHandler = () => {
    setShowAreYouSureButton(true);
    setSecondsBeforeDisapearing(5);
    setTimeout(() => {
      setSecondsBeforeDisapearing(4);
    }, 1000);
    setTimeout(() => {
      setSecondsBeforeDisapearing(3);
    }, 2000);
    setTimeout(() => {
      setSecondsBeforeDisapearing(2);
    }, 3000);
    setTimeout(() => {
      setSecondsBeforeDisapearing(1);
    }, 4000);
    setTimeout(() => {
      setShowAreYouSureButton(false);
    }, 5000);
  };

  const deleteAccountHandler = (event) => {
    archiveAccount(true);
    notification.error({
      message: (
        <>
          <b> {t("profile.willBeArchived")} </b>{" "}
          {t("profile.loggingToReactivate")}
        </>
      ),
      placement: "bottomRight",
    });
    authStore.logout();
  };

  return (
    <div className="EditSettings__singleSetting">
      <Button
        block
        className="deleteButton"
        icon={<DeleteOutlined />}
        onClick={areYouSureHandler}
        type="primary"
      >
         &nbsp;{t("profile.deleteAccount")}
      </Button>
      {showAreYouSureButton && (
        <>
          <div className="deleteButtonSpacer"></div>
          <Button
            block
            className="deleteButton"
            icon={<WarningOutlined />}
            onClick={deleteAccountHandler}
            type="primary"
          >
             &nbsp;{t("profile.areYouSure")} ... {secondsBeforeDisapearing}
          </Button>
        </>
      )}
    </div>
  );
};
