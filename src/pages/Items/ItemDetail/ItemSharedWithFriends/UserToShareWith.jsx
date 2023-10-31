import React from "react";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

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
        onClick={() => handleAddUserToSharedWithList(user._id)}
      ></div>
    </Tooltip>
  );
});
