const router = require("express").Router();

// healthCheck
router.get("/", async (req, res) => {

    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    console.log(healthcheck);

    try {
        res.status(200).json(healthcheck);
    } catch (err) {
        healthcheck.message = console.error();;
        res.status(503).send();
    }
});

module.exports = router;