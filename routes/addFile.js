const express = require('express');
const {addFile} = require("../util/files");
const {addFolder} = require("../util/files");
const {authenticateToken} = require("../util/tokenValidation");
const router = express.Router();

router.post('/', authenticateToken, function (req, res, next) {
    const email = req.user.email;
    const path = req.body.path;
    const file = req.files.file;
    addFile(email, path, file).then(result => res.send(result));
});

module.exports = router;
