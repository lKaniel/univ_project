const jwt = require("jsonwebtoken");

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function generateAccessTokenEndless(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '365d' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')
    token = token[token?.length-1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}