const { Usersfriend } = require("../../models/Usersfriend");
const { Op } = require("sequelize");

exports.friendService = {
  async getFriends(userId) {
    return foundFollowers = await Usersfriend.findAll({
      where: { user_id: userId, pending: false },
    });
  },

  async getFriendsPending(userId) {
    return foundPending = await Usersfriend.findAll({
      where: {
        [Op.or]: [
          { user_id: userId },
          { friend_id: userId }
        ],
        pending: true,
      }
    });
  },

  async addFriendRequest(userId, friendId) {
    try {
      const newFriend = new Usersfriend({
        user_id: userId,
        friend_id: friendId,
      });
      return await newFriend.save();
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
