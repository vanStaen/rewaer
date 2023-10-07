const { UsersFollowers } = require("../../models/UsersFollowers");

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
      return await newFollow.save();
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
