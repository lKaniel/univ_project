const bcrypt = require("bcrypt");
const {innitFolder} = require("./files");
const {generateAccessToken} = require("./tokenValidation");
const {getPassword} = require("../db/usersController");
const {addUser} = require("../db/usersController");
const saltRounds = 10;

const register = async (email, password) => {
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    try {
        innitFolder(email)
        return await addUser(email, encryptedPassword)
    } catch (e) {
        return false
    }
}

const login = async (email, password) => {
    const realPassword = await getPassword(email)
    if (!realPassword) return null
    const compare = await bcrypt.compare(password, realPassword)
    if (compare) {
        return generateAccessToken({email: email})
    }
    return null
}

module.exports = {
    register,
    login
}