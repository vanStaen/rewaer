import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Divider, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { MenuBar } from "../../../components/MenuBar/MenuBar";
import { userStore } from "../../../stores/userStore/userStore";

import "./EditSettings.css";

export const EditSettings = observer(() => {
  //userStore.emailSettings
  //userStore.profilSettings
  return (
    <div className="EditSettings__main">
      <MenuBar />
      <div className="EditSettings__container">
        <div className="EditSettings__title">Edit your settings on Rewær</div>
        <br />
        <Divider orientation="left" plain>
          Profil Settings
        </Divider>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />{" "}
          Show in my profil when I was last seen online
        </div>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />{" "}
          Hide my account to anyone which is not my friend
        </div>
        <br />
        <Divider orientation="left" plain>
          Email Settings
        </Divider>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />{" "}
          Send me a mail when I get a friend request
        </div>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />{" "}
          Send me a mail when I get a new message
        </div>
        <div className="EditSettings__singleSetting">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />{" "}
          Keep me informed about all changes hapenning with Rewær
        </div>
      </div>
    </div>
  );
});
