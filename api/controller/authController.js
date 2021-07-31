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
    const loginSuccess = await authService.login(req.body.username, req.body.email, req.body.password, req.body.remind);
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
    if (!req.body.userId) {
      throw new Error("Please provide at least an 'Email' or a 'Username'");
    }
    const logoutSuccess = await authService.logout(req.body.userId);
    if (logout) {
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