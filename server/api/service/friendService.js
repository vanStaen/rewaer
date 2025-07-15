import { Usersfriend } from "../../models/Usersfriend.js";
import { notificationService } from "./notificationService.js";

export const friendService = {
  async getFriends(userId) {
    return await Usersfriend.findAll({
      where: { userId, pending: false },
    });
  },

  async getFriendsPending(userId) {
    return await Usersfriend.findAll({
      where: { userId, pending: true },
    });
  },

  async getFriendsRequest(userId) {
    return await Usersfriend.findAll({
      where: { friendId: userId, pending: true },
    });
  },

  async addFriendRequest(userId, friendId) {
    try {
      const newFriend = new Usersfriend({
        userId: parseInt(userId),
        friendId: parseInt(friendId),
      });
      await newFriend.save();
      await notificationService.createNotificationNewFriendRequest(
        userId,
        friendId,
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async validateFriendRequest(userId, friendId) {
    try {
      await Usersfriend.update(
        { pending: false },
        {
          where: {
            userId: parseInt(friendId),
            friendId: parseInt(userId),
          },
        },
      );
      const newFriend = new Usersfriend({
        userId: parseInt(userId),
        friendId: parseInt(friendId),
        pending: false,
      });
      await newFriend.save();
      await notificationService.createNotificationNewFriend(userId, friendId);
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async cancelFriendRequest(userId, friendId) {
    try {
      await Usersfriend.destroy({
        where: {
          userId: parseInt(userId),
          friendId: parseInt(friendId),
        },
      });
      await notificationService.deleteNotificatioFriendRequest(
        userId,
        friendId,
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteFriend(userId, friendId) {
    await Usersfriend.destroy({
      where: {
        userId: parseInt(userId),
        friendId: parseInt(friendId),
      },
    });
    await Usersfriend.destroy({
      where: {
        userId: parseInt(friendId),
        friendId: parseInt(userId),
      },
    });
    return true;
  },
};
