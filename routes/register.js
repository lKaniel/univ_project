const express = require('express');
const router = express.Router();
const {register} = require('../util/users')

router.post('/', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    register(email, password).then(result => res.send(result))
});

module.exports = router;
