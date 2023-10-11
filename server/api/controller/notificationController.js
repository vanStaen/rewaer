const router = require("express").Router();
const { notificationService } = require("../service/notificationService");

// get all notification (Debugging)
router.get("/", async (req, res) => {
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

module.exports = router;