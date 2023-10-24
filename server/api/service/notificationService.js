const { Notification } = require("../../models/Notification");
const { User } = require("../../models/User");
const { Op } = require("sequelize");

exports.notificationService = {

  async getAllNotifications() {
    try {
      return await Notification.findAll({
        order: [['_id', 'DESC']]
      });
    } catch (err) {
      console.log(err);
    }
  },

  async getNotifications(userId) {
    try {
      return await Notification.findAll({
        order: [['_id', 'DESC']],
        where: { user_id: userId }
      });
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationNewFollower(userId, followerId) {
    try {
      const follower = await User.findOne({
        where: { _id: followerId }
      });
      const newNotification = new Notification({
        user_id: userId,
        media_url: follower.avatar,
        title: follower.userName,
        type: 2,
        action_data: followerId
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
        where: { _id: requestingId }
      });
      const newNotification = new Notification({
        user_id: requestedId,
        media_url: requesting.avatar,
        title: requesting.userName,
        type: 1,
        action_data: requestingId
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationNewFriend(friendId, userId) {
    try {
      const user = await User.findOne({
        where: { _id: userId }
      });
      const newNotification = new Notification({
        user_id: friendId,
        media_url: user.avatar,
        title: user.userName,
        type: 17,
        action_data: userId
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
          user_id: requestedId,
          action_data: requestingId,
          type: 1,
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationBasic(userId, mediaUrl, notificationType, actionData) {
    try {
      const user = await User.findOne({
        where: { _id: userId },
        include: [
          "friends",
          "followers",
        ],
      });
      const username = user.userName;
      let listOfFriendsAndFollowersId = [];
      user.friends.forEach((friend) => { listOfFriendsAndFollowersId.push(friend._id) });
      user.followers.forEach((follower) => { listOfFriendsAndFollowersId.push(follower._id) });
      const listOfUniqueId = [...new Set(listOfFriendsAndFollowersId)];
      for (const id of listOfUniqueId) {
        const newNotification = new Notification({
          user_id: id,
          media_url: mediaUrl,
          title: username,
          type: notificationType,
          action_data: actionData
        });
        await newNotification.save();
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationSingle(userId, userNotifiedId, mediaUrl, notificationType, actionData) {
    try {
      const user = await User.findOne({
        where: { _id: userId }
      });
      const username = user.userName;
      const newNotification = new Notification({
        user_id: userNotifiedId,
        media_url: mediaUrl,
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
            user_id: userId,
          }
        });
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
        }
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
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  async deleteNotification(notificationId, userId) {
    try {
      return await Notification.destroy({
        where: {
          _id: notificationId,
          user_id: userId,
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

};
