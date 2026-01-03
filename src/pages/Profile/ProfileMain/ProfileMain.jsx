import React from "react";
import { observer } from "mobx-react";
import { CameraOutlined, SkinOutlined } from "@ant-design/icons";

import "./ProfileMain.less";
import { SimpleSubMenu } from "@components/SimpleSubMenu/SimpleSubMenu";

export const ProfileMain = observer(({ contentToDisplay }) => {
  const items = [
    { icon: <CameraOutlined />, title: null, action: null },
    { icon: <SkinOutlined />, title: null, action: null },
  ];

  return (
    <>
      <SimpleSubMenu menuItems={items} />
      <div className="profil__containerCenterContent">
        {contentToDisplay === "wall" && <>Nothing here yet</>}
      </div>
    </>
  );
});
