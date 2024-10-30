import { Usersfollower } from "../../models/Usersfollower.js";
import { notificationService } from "./notificationService.js";

export const followerService = {
  async getFollower(userId) {
    return foundFollowers = await Usersfollower.findAll({
      where: { followed_id: userId },
    });
  },

  async getFollowing(userId) {
    return foundFollowing = await Usersfollower.findAll({
      where: { follower_id: userId },
    });
  },

  async addFollow(follower, followed) {
    try {
      const newFollow = new Usersfollower({
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
    await Usersfollower.destroy({
      where: {
        follower_id: follower,
        followed_id: followed,
      },
    });
    return true;
  },
};
