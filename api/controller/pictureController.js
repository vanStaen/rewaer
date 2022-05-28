const router = require('express').Router()
const { pictureService } = require('../service/pictureService')

// Picture Processing
router.post('/flip/', async (req, res) => {
  if (!req.isAuth) {
    throw new Error('Unauthorized!')
  }
  try {
    if (!req.body.id) {
      throw new Error('Please provide a picture id!')
    }
    const pitureId = req.body.id
    const mailSent = await pictureService.flipPicture(id)
    res.status(200).json({
      sent: mailSent
    })
  } catch (err) {
    res.status(400).json({
      error: `${err}`
    })
  }
})

module.exports = router
