import React, { useState } from "react";
import { Modal } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";

import { userStore } from "../../../../stores/userStore/userStore.js";
import { itemsStore } from "../../itemsStore.ts";
import { UserToShareWith } from "./UserToShareWith";

import "./ItemSharedWithFriends.css";

// TODO: translation

export const ItemSharedWithFriends = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const sharedWithArray = itemsStore.selectedItem.sharedWith
    ? Object.values(itemsStore.selectedItem.sharedWith)
    : [];
  const itemSharedWith = sharedWithArray.map((userId) => {
    return (
      <UserToShareWith
        userId={userId}
        type="alreadySharedWith"
        setShowModal={setShowModal}
        key={userId}
      />
    );
  });

  const itemSharabledWith = userStore.friends.map((user) => {
    const alreadyShared = !(sharedWithArray.indexOf(parseInt(user.id)) < 0);
    if (!alreadyShared) {
      return (
        <UserToShareWith
          userId={user.id}
          type="sharableWith"
          setShowModal={setShowModal}
          key={user.id}
        />
      );
    }
    return null;
  });

  const itemSharabledWithLength = itemSharabledWith.filter((e) => e).length;

  return (
    <div className="itemShared__Container">
      {itemSharedWith}
      {itemSharabledWithLength > 0 && (
        <>
          <div
            className="itemdetail__addFriend pointerCursor"
            onClick={() => setShowModal(true)}
          >
            <PlusOutlined />
          </div>
          <Modal
            title={t("item.Share this item with")}
            centered
            open={showModal}
            footer={null}
            onCancel={() => setShowModal(false)}
          >
            {itemSharabledWith}
          </Modal>
        </>
      )}
    </div>
  );
});
