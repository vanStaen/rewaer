import { Notification } from "../../models/Notification.js";
import { User } from "../../models/User.js";
import { Op } from "sequelize";

export const notificationService = {
  async getAllNotifications() {
    try {
      return await Notification.findAll({
        order: [["id", "DESC"]],
      });
    } catch (err) {
      console.log(err);
    }
  },

  async getNotifications(userId) {
    try {
      return await Notification.findAll({
        order: [["id", "DESC"]],
        where: { userId },
      });
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationNewFollower(userId, followerId) {
    try {
      const follower = await User.findOne({
        where: { id: followerId },
      });
      const newNotification = new Notification({
        userId,
        media_url: follower.avatar,
        title: follower.userName,
        type: 2,
        action_data: followerId,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationNewFriendRequest(requestingId, requestedId) {
    try {
      const requesting = await User.findOne({
        where: { id: requestingId },
      });
      const newNotification = new Notification({
        userId: requestedId,
        media_url: requesting.avatar,
        title: requesting.userName,
        type: 1,
        action_data: requestingId,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationNewFriend(userId, friendId) {
    try {
      const user = await User.findOne({
        where: { id: userId },
      });
      const newNotification = new Notification({
        userId: friendId,
        media_url: user.avatar,
        title: user.userName,
        type: 17,
        action_data: userId,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteNotificatioFriendRequest(requestingId, requestedId) {
    try {
      return await Notification.destroy({
        where: {
          userId: requestedId,
          action_data: requestingId,
          type: 1,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationBasic(userId, mediaId, notificationType, actionData) {
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: ["friends", "followers"],
      });
      const username = user.userName;
      const listOfFriendsAndFollowersId = [];
      user.friends.forEach((friend) => {
        listOfFriendsAndFollowersId.push(friend.id);
      });
      user.followers.forEach((follower) => {
        listOfFriendsAndFollowersId.push(follower.id);
      });
      const listOfUniqueId = [...new Set(listOfFriendsAndFollowersId)];
      for (const id of listOfUniqueId) {
        const newNotification = new Notification({
          userId: id,
          media_url: mediaId,
          title: username,
          type: notificationType,
          action_data: actionData,
        });
        await newNotification.save();
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationSingle(
    userId,
    userNotifiedId,
    mediaId,
    notificationType,
    actionData,
  ) {
    try {
      const user = await User.findOne({
        where: { id: userId },
      });
      const username = user.userName;
      const newNotification = new Notification({
        userId: userNotifiedId,
        media_url: mediaId,
        title: username,
        type: notificationType,
        action_data: actionData,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  async markNotificationsAsSeen(userId) {
    try {
      return await Notification.update(
        { seen: true },
        {
          where: {
            userId,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  },

  async deleteNotificationItem(itemId) {
    try {
      return await Notification.destroy({
        where: {
          action_data: itemId,
          type: {
            [Op.or]: [4, 6, 9, 10],
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  async deleteNotificationLook(lookId) {
    try {
      return await Notification.destroy({
        where: {
          action_data: lookId,
          type: {
            [Op.or]: [5],
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  async deleteNotification(notificationId, userId) {
    try {
      return await Notification.destroy({
        where: {
          id: notificationId,
          userId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
