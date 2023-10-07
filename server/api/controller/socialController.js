const router = require("express").Router();
const { followerService } = require("../service/followerService");

// get follower
router.get("/followers", async (req, res) => {
  try {
    const followers = await followerService.getFollower(req.userId);
    res.status(200).json({
      followers: followers,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.get("/following", async (req, res) => {
  try {
    const followers = await followerService.getFollowing(req.userId);
    res.status(200).json({
      following: followers,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.post("/follow", async (req, res) => {    
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    const follower = req.userId;
    const followed = req.body.followed;
    const response = await followerService.addFollow(follower, followed);
    res.status(200).json({
      success: response,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.delete("/follow", async (req, res) => {    
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    const follower = req.userId;
    const followed = req.body.followed;
    const response = await followerService.deleteFollow(follower, followed);
    res.status(200).json({
      success: response,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;