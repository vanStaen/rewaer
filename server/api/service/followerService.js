import { Usersfollower } from "../../models/Usersfollower.js";
import { notificationService } from "./notificationService.js";

export const followerService = {
  async getFollower(userId) {
    return await Usersfollower.findAll({
      where: { followedId: userId },
    });
  },

  async getFollowing(userId) {
    return await Usersfollower.findAll({
      where: { followerId: userId },
    });
  },

  async addFollow(follower, followed) {
    try {
      const newFollow = new Usersfollower({
        followerId: follower,
        followedId: followed,
      });
      const newFollower = await newFollow.save();
      await notificationService.createNotificationNewFollower(
        followed,
        follower,
      );
      return newFollower;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteFollow(follower, followed) {
    await Usersfollower.destroy({
      where: {
        followerId: follower,
        followedId: followed,
      },
    });
    return true;
  },
};
