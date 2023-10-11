const { Notification } = require("../../models/Notification");
const { User } = require("../../models/User");

exports.notificationService = {

  async getAllNotifications() {
    try {             
      return await Notification.findAll();
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
          user_id: id ,
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
};
