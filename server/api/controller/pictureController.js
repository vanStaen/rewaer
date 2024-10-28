import { Router } from "express";
import pictureService from "../service/pictureService.js";
const router = Router();

// Picture Processing
router.post('/flip/', async (req, res) => {
  if (!req.isAuth) {
    throw new Error('Unauthorized!')
  }
  try {
    if (!req.body.url) {
      throw new Error('Please provide a picture url!')
    }
    const url = req.body.url
    const isMirror = req.body.isMirror;
    newUrl = await pictureService.flipPicture(url, isMirror)
    res.status(200).json({
      newUrl: newUrl
    })
  } catch (err) {
    res.status(400).json({
      error: `${err}`
    })
  }
})

router.post('/rotate/', async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error('Unauthorized!')
    }
    if (!req.body.url) {
      throw new Error('Please provide a picture url!')
    }
    const url = req.body.url;
    const numberOfQuarterTurnToTheRight = req.body.numberOfQuarterTurnToTheRight;
    const newUrl = await pictureService.rotatePicture(url, numberOfQuarterTurnToTheRight);
    res.status(200).json({
      newUrl: newUrl
    })
  } catch (err) {
    res.status(400).json({
      error: `${err}`
    })
  }
})

router.post('/tint/', async (req, res) => {
  if (!req.isAuth) {
    throw new Error('Unauthorized!')
  }
  try {
    if (!req.body.url) {
      throw new Error('Please provide a picture url!')
    }
    const url = req.body.url;
    const red = req.body.red;
    const green = req.body.green;
    const blue = req.body.blue;
    newUrl = await pictureService.tintPicture(url, red, green, blue)
    res.status(200).json({
      newUrl: newUrl
    })
  } catch (err) {
    res.status(400).json({
      error: `${err}`
    })
  }
})

module.exports = router
