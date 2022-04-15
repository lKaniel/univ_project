const express = require('express');
const {getInnerFiles} = require("../util/files");
const {authenticateToken} = require("../util/tokenValidation");
const router = express.Router();

    router.get('/', authenticateToken, async function (req, res, next) {
    const email = req.user.email;
    const path = req.query.path || "/";
    const files = await getInnerFiles(email, path);
    res.send(files)
});

module.exports = router;
