import React from "react";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { CloseCircleFilled } from "@ant-design/icons";

import { userStore } from "../../../../stores/userStore/userStore";
import { itemsStore } from "../../itemsStore";
import { updateItemSharedWith } from "./updateItemSharedWith";

import "./ItemSharedWithFriends.css";

export const UserToShareWith = observer((props) => {
  const { userId, type } = props;

  const userData = userStore.friends.filter(
    (user) => parseInt(user._id) === parseInt(userId)
  );

  const handleAddUserToSharedWithList = async (userId) => {
    if (type === "sharableWith") {
      try {
        const updateSharedWithArray = itemsStore.selectedItem.sharedWith;
        updateSharedWithArray.push(parseInt(userId));
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
    }
  };

  const handleDeleteUserFromSharedWithList = async (userId) => {
    if (type === "alreadySharedWith") {
      try {
        const updatedSharedWithArray =
          itemsStore.selectedItem.sharedWith.filter(
            (id) => parseInt(id) === parseInt(userId)
          );
        const updateSelecteditem = {
          ...itemsStore.selectedItem,
          sharedWith: updatedSharedWithArray,
        };
        await updateItemSharedWith(
          itemsStore.selectedItem._id,
          updatedSharedWithArray
        );
        itemsStore.setSelectedItem(updateSelecteditem);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  return (
    <Tooltip
      title={
        <Link to={`/${userData[0].userName}`} className="linkAvatarUsername">
          {userData[0].userName}
        </Link>
      }
    >
      <div
        className="itemdetail__userAvatar pointerCursor"
        style={{
          background: `url("${userData[0].avatar}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => handleAddUserToSharedWithList(userId)}
      >
        {type === "alreadySharedWith" && (
          <CloseCircleFilled
            onClick={() => handleDeleteUserFromSharedWithList(userId)}
            className="itemdetail__deleteFriendShared"
          />
        )}
      </div>
    </Tooltip>
  );
});
