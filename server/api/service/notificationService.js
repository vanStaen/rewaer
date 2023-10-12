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

  async createNotificationType4to7(userId, mediaUrl, notificationType, actionData) {
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
      user.friends.forEach((friend) => {listOfFriendsAndFollowersId.push(friend._id)});
      user.followers.forEach((follower) => {listOfFriendsAndFollowersId.push(follower._id)});
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

  async markNotificationsAsSeen(userId){
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

};
