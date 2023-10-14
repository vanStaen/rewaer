const router = require("express").Router();
const { notificationService } = require("../service/notificationService");

/* get all notification (Debugging)*/
router.get("/all", async (req, res) => {
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
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
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

router.post("/", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const userId = req.userId;
    const userNotifiedId = req.body.userNotifiedId;
    const mediaUrl = req.body.mediaUrl;
    const type = req.body.notificationType;
    const response = await notificationService.createNotificationSingle(userId, userNotifiedId, mediaUrl, type);
    res.status(200).json({
      created: response,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.post("/seen", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await notificationService.markNotificationsAsSeen(req.userId);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const notifications = await notificationService.deleteNotification(req.body.id, req.userId);
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