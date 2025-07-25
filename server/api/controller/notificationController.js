import { Router } from "express";
import { notificationService } from "../service/notificationService.js";
const router = Router();

/* get all notification (Debugging) */
router.get("/all", async (req, res) => {
  try {
    const notifications = await notificationService.getAllNotifications();
    res.status(200).json({
      notifications,
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
    const notifications = await notificationService.getNotifications(
      req.userId,
    );
    res.status(200).json({
      notifications,
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
    const mediaId = req.body.mediaId;
    const type = req.body.notificationType;
    const actionData = req.body.actionData;
    const response = await notificationService.createNotificationSingle(
      userId,
      userNotifiedId,
      mediaId,
      type,
      actionData,
    );
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
    const notifications = await notificationService.deleteNotification(
      req.body.id,
      req.userId,
    );
    res.status(200).json({
      notifications,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

export { router };
