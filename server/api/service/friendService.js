const { UsersFriends } = require("../../models/UsersFriends");
const { Op } = require("sequelize");

exports.friendService = {
  async getFriends(userId) {
    return foundFollowers = await UsersFriends.findAll({
      where: { user_id: userId, pending: false },
    });
  },

  async getFriendsPending(userId) {
    return foundPending = await UsersFriends.findAll({
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
      const newFriend = new UsersFriends({
        user_id: userId ,
        friend_id: friendId,
      });
      return await newFriend.save();
    } catch (err) {
      console.log(err);
    }
  },

  async validateFriendRequest(userId, friendId) {
    try {
      await UsersFriends.update(
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
      const newFriend = new UsersFriends({
        user_id: userId ,
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
      await UsersFriends.destroy({
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

  async cancelFremdFriendRequest(userId, friendId) {
    try {
      await UsersFriends.destroy({
        where: {        
          user_id: friendId,
          friend_id: userId,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteFriend(userId, friendId) {
    await UsersFriends.destroy({
      where: {        
        user_id: userId ,
        friend_id: friendId,
      },
    });
    await UsersFriends.destroy({
      where: {        
        user_id: friendId,
        friend_id: userId,
      },
    });
    return true;
  },
};
