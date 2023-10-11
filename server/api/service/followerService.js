const { UsersFollowers } = require("../../models/UsersFollowers");
const { notificationService } = require("./notificationService");

exports.followerService = {
  async getFollower(userId) {
    return foundFollowers = await UsersFollowers.findAll({
      where: { followed_id: userId },
    });
  },

  async getFollowing(userId) {
    return foundFollowing = await UsersFollowers.findAll({
      where: { follower_id: userId },
    });
  },

  async addFollow(follower, followed) {
    try {
      const newFollow = new UsersFollowers({
        follower_id: follower,
        followed_id: followed,
      });
      const newFollower = await newFollow.save();
      await notificationService.createNotificationNewFollower(followed, follower);
      return newFollower;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteFollow(follower, followed) {
    await UsersFollowers.destroy({
      where: {        
        follower_id: follower,
        followed_id: followed,
      },
    });
    return true;
  },

};
