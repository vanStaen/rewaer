import React, { useState } from "react";
import { Modal, Tooltip } from "antd";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";

import { userStore } from "../../../../stores/userStore/userStore";
import { itemsStore } from "../../itemsStore";
import { postGetProfileById } from "./postGetProfileById";
import { updateItemSharedWith } from "./updateItemSharedWith";

import "./ItemSharedWithFriends.css";

export const ItemSharedWithFriends = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  console.log("itemsStore.selectedItem", itemsStore.selectedItem);

  const handleAddUserToSharedWithList = async (userId) => {
    try {
      const updateSharedWithArray = itemsStore.selectedItem.sharedWith;
      updateSharedWithArray.push(parseInt(userId));
      console.log(updateSharedWithArray);
      const updateSelecteditem = {
        ...itemsStore.selectedItem,
        sharedWith: updateSharedWithArray,
      };
      await updateItemSharedWith(
        itemsStore.selectedItem._id,
        updateSharedWithArray
      );
      itemsStore.setSelectedItem(updateSelecteditem);
    } catch (e) {
      console.log("error", e);
    }
  };

  /*const itemSharedWith = itemsStore.selectedItem.sharedWith.map(
    async (userId) => {
      const userData = await postGetProfileById(userId);
      return (
        <Tooltip
          title={
            <Link to={`/${userData.userName}`} className="linkAvatarUsername">
              {userData.userName}
            </Link>
          }
          key={`avatar_${userId}`}
        >
          <div
            className="itemdetail__userAvatar pointerCursor"
            style={{
              background: `url("${userData.avatar}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Tooltip>
      );
    }
  );*/

  const itemSharabledWith = userStore.friends.map((user) => {
    return (
      <Tooltip
        title={
          <Link to={`/${user.userName}`} className="linkAvatarUsername">
            {user.userName}
          </Link>
        }
        key={`avatar_${user._id}`}
      >
        <div
          className="itemdetail__userAvatar pointerCursor"
          style={{
            background: `url("${user.avatar}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onClick={() => handleAddUserToSharedWithList(user._id)}
        ></div>
      </Tooltip>
    );
  });

  return (
    <div className="itemShared__Container">
      {/*itemSharedWith*/}
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
