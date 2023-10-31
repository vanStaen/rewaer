import React, { useState } from "react";
import { Modal } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";

import { userStore } from "../../../../stores/userStore/userStore";
import { itemsStore } from "../../itemsStore";
import { UserToShareWith } from "./UserToShareWith";

import "./ItemSharedWithFriends.css";

export const ItemSharedWithFriends = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const sharedWithArray = Object.values(itemsStore.selectedItem.sharedWith);
  const itemSharedWith = sharedWithArray.map((userId, index) => {
    return <UserToShareWith userId={userId} type="alreadySharedWith" />;
  });

  const itemSharabledWith = userStore.friends.map((user) => {
    return <UserToShareWith userId={user._id} type="sharableWith" />;
  });

  return (
    <div className="itemShared__Container">
      {itemSharedWith}
      <div
        className="itemdetail__addFriend pointerCursor"
        onClick={() => setShowModal(true)}
      >
        <PlusOutlined />
      </div>
      <Modal
        title="Share this item with"
        centered
        open={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        {itemSharabledWith}
      </Modal>
    </div>
  );
});
