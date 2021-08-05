const router = require("express").Router();
const authService = require("../service/authService");

// Login
router.post("/login", async (req, res) => {
  try {
    if (!req.body.email && !req.body.username) {
      throw new Error("Please provide at least an 'Email' or a 'Username'");
    }
    if (!req.body.remind) {
      throw new Error("The 'remind me'-flag shoud not be missing!");
    }
    const loginSuccess = await authService.authService.login(req, req.body.email, req.body.username, req.body.password, req.body.remind);
    res.status(200).json({
      success: loginSuccess,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// Logout
router.delete("/logout", async (req, res) => {
  try {
    const logoutSuccess = await authService.authService.logout(req);
    if (logoutSuccess) {
      res.status(200).json({
        success: logoutSuccess,
      });
    } else {
      throw new Error("Error during Logout!");
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }4
});

module.exports = router;