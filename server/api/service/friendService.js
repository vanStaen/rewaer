const { Usersfriend } = require("../../models/Usersfriend");
const { notificationService } = require("./notificationService");

exports.friendService = {
  async getFriends(userId) {
    return foundFollowers = await Usersfriend.findAll({
      where: { user_id: userId, pending: false },
    });
  },

  async getFriendsPending(userId) {
    return foundPending = await Usersfriend.findAll({
      where: { user_id: userId, pending: true }
    });
  },

  async getFriendsRequest(userId) {
    return foundPending = await Usersfriend.findAll({
      where: { friend_id: userId, pending: true }
    });
  },

  async addFriendRequest(userId, friendId) {
    try {
      const newFriend = new Usersfriend({
        user_id: userId,
        friend_id: friendId,
      });
      await newFriend.save();
      await notificationService.createNotificationNewFriendRequest(userId, friendId);
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
            user_id: userId,
            friend_id: friendId,
          },
          returning: true,
          plain: true,
        }
      );
      const newFriend = new Usersfriend({
        user_id: userId,
        friend_id: friendId,
        pending: false,
      });
      await newFriend.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async cancelFriendRequest(userId, friendId) {
    try {
      await Usersfriend.destroy({
        where: {
          user_id: userId,
          friend_id: friendId,
        },
      });
      await notificationService.deleteNotificatioFriendRequest(userId, friendId);
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteFriend(userId, friendId) {
    await Usersfriend.destroy({
      where: {
        user_id: userId,
        friend_id: friendId,
      },
    });
    await Usersfriend.destroy({
      where: {
        user_id: friendId,
        friend_id: userId,
      },
    });
    return true;
  },
};
