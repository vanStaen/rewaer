const router = require("express").Router();
const { notificationService } = require("../service/notificationService");

// get all notification (Debugging)
router.get("/all", async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    const notifications = await notificationService.getAllNotifications();
    res.status(200).json({
      notifications: notifications,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.get("/", async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    const notifications = await notificationService.getNotifications(req.userId);
    res.status(200).json({
      notifications: notifications,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});



module.exports = router;