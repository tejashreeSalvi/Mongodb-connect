const express = require("express");
const router = express.Router();

router.get((req, res, next) => {
    console.log("In Error Handler request");
    const error = new Error('API do not exist');
    error.status = 404;
    next(error);
});

router.get((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    })
})

module.exports = router;