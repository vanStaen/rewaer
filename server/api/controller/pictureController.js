import { Router } from "express";
import { pictureService } from "../service/pictureService.js";
const router = Router();

// Picture Processing
router.post("/flip/", async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    if (!req.body.path) {
      throw new Error("Please provide a path!");
    }
    if (!req.body.bucket) {
      throw new Error("Please provide a bucket!");
    }
    const path = req.body.path;
    const bucket = req.body.bucket;
    const isMirror = req.body.isMirror;
    const newPath = await pictureService.flipPicture(
      path,
      bucket,
      req.userId,
      isMirror,
    );
    res.status(200).json({
      newPath,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.post("/rotate/", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    if (!req.body.path) {
      throw new Error("Please provide a path!");
    }
    if (!req.body.bucket) {
      throw new Error("Please provide a bucket!");
    }
    const path = req.body.path;
    const bucket = req.body.bucket;
    const numberOfQuarterTurnToTheRight =
      req.body.numberOfQuarterTurnToTheRight;
    const newPath = await pictureService.rotatePicture(
      path,
      bucket,
      req.userId,
      numberOfQuarterTurnToTheRight,
    );
    res.status(200).json({ newPath });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.post("/tint/", async (req, res) => {
  if (!req.isAuth) {
    throw new Error("Unauthorized!");
  }
  try {
    if (!req.body.url) {
      throw new Error("Please provide a picture url!");
    }
    const url = req.body.url;
    const red = req.body.red;
    const green = req.body.green;
    const blue = req.body.blue;
    const newUrl = await pictureService.tintPicture(url, red, green, blue);
    res.status(200).json({
      newUrl,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

router.post("/crop/", async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    if (!req.body.path) {
      throw new Error("Please provide a path!");
    }
    if (!req.body.bucket) {
      throw new Error("Please provide a bucket!");
    }
    const path = req.body.path;
    const bucket = req.body.bucket;
    const left = req.body.left;
    const top = req.body.top;
    const width = req.body.width;
    const height = req.body.height;
    const newPath = await pictureService.cropPicture(
      path,
      bucket,
      req.userId,
      left,
      top,
      width,
      height,
    );
    res.status(200).json({ newPath });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

export { router };
