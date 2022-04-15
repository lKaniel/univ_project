const express = require('express');
const {authenticateToken} = require("../util/tokenValidation");
const router = express.Router();
const {login} = require('../util/users')

router.get('/', authenticateToken, function (req, res, next) {
    const email = req.email;
    res.send(true)
});

module.exports = router;
