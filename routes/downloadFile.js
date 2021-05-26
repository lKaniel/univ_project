const express = require('express');
const {getFile} = require("../util/files");
const {authenticateToken} = require("../util/tokenValidation");
const router = express.Router();

router.get('/', authenticateToken, async function (req, res, next) {
    const email = req.user.email;
    const path = req.query.path;
    if (!path ||  path == undefined) {
        res.send(400)
        return
    }
    const file = await getFile(email, path)
    res.download(file)
});

module.exports = router;
