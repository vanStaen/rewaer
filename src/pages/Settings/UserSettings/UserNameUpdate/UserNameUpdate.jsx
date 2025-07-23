import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip, notification, Button, Input } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { userStore } from "../../../../stores/userStore/userStore";
import { updateUserName } from "./updateUserName";
import { postUsernameTaken } from "../../../../components/SignUpForm/postUsernameTaken";
import { MAX_USERNAME_CHANGE_ALLOWED } from "../../../../lib/data/setup";

export const UserNameUpdate = () => {
  const { t } = useTranslation();
  const [userNameIsValidating, setUserNameIsValidating] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState(false);
  const [newUserName, setNewUserName] = useState(null);
  const [errorMsgUsername, setErrorMsgUsername] = useState(
    MAX_USERNAME_CHANGE_ALLOWED - userStore.usernameChange === 0
      ? t("profile.MaxUserNameChange")
      : null,
  );

  const onInputUsernameHandler = async (event) => {
    setUserNameIsValidating(true);
    const usernameTemp = event.target.value;
    // eslint-disable-next-line
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (usernameTemp) {
      if (usernameTemp.includes(" ")) {
        setUserNameAvailable(false);
        setErrorMsgUsername(t("login.spacesinUsername"));
      } else if (usernameTemp.match(regexEmail)) {
        setUserNameAvailable(false);
        setErrorMsgUsername(t("login.usernameShouldNotBeAnEmail"));
      } else {
        const isTaken = await postUsernameTaken(usernameTemp);
        setUserNameAvailable(!isTaken);
        if (isTaken) {
          setUserNameAvailable(false);
          setErrorMsgUsername(t("login.usernameIsAlreadyTaken"));
        } else {
          setNewUserName(usernameTemp);
          setErrorMsgUsername(null);
        }
      }
    } else {
      setUserNameAvailable(false);
    }
    setUserNameIsValidating(false);
  };

  const onChangeUserNameHandler = async () => {
    setUserNameIsValidating(true);
    const response = await updateUserName(
      newUserName.toLowerCase(),
      userStore.usernameChange + 1,
    );
    if (response) {
      userStore.setUserName(newUserName);
      userStore.setUsernameChange(userStore.usernameChange + 1);
      notification.success({
        message: (
          <>
            {t("profile.yourNewUserName")} <b>{newUserName}</b>{" "}
            {t("profile.hasBeenSaved")}
          </>
        ),
        placement: "bottomRight",
      });
      setNewUserName(null);
    }
    setUserNameIsValidating(false);
  };

  return (
    <div className="EditSettings__singleSetting">
      {t("profile.changeUserName")}:&nbsp;&nbsp;
      <Input
        placeholder={userStore.userName}
        style={{ width: "250px" }}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip
            title={
              <>
                {MAX_USERNAME_CHANGE_ALLOWED - userStore.usernameChange}{" "}
                {t("profile.changesLeft")}
              </>
            }
          >
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
        onChange={onInputUsernameHandler}
      />{" "}
      <Tooltip title={errorMsgUsername} placement="right">
        <Button
          type="primary"
          shape="circle"
          onClick={onChangeUserNameHandler}
          icon={<ArrowRightOutlined />}
          loading={userNameIsValidating}
          disabled={
            MAX_USERNAME_CHANGE_ALLOWED - userStore.usernameChange === 0 ||
            !userNameAvailable
          }
        />
      </Tooltip>
    </div>
  );
};
