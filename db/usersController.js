const con = require("./props");

const addUser = (email, password) => {
    return new Promise(function (resolve, reject) {
        const sql = `INSERT INTO users (email, password) VALUES ("${email}", "${password}")`;
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    });
};

const checkUser = (email, password) => {
    return new Promise(function (resolve, reject) {
        const sql = `SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`;
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result === undefined) resolve(null);
            for (let i = 0; i < result?.length; i++) {
                let sqlPost = result[i];
                resolve(sqlPost.email);
            }
            resolve(null);
        });
    });
}

const getPassword = (email) => {
    return new Promise(function (resolve, reject) {
        const sql = `SELECT * FROM users WHERE email = "${email}"`;
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            if (result === undefined) resolve(null);
            for (let i = 0; i < result?.length; i++) {
                let sqlPost = result[i];
                resolve(sqlPost.password);
            }
            resolve(null);
        });
    });
}

const removeUser = (email) => {
    return new Promise(function (resolve, reject) {
        const sql = `DELETE FROM users WHERE email = "${email}"`;
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    })
};

const updatePassword = (email, password) => {
    return new Promise(function (resolve, reject) {
        const sql = `UPDATE users set password = "${password}" WHERE email = ${email}`;
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    })
};

module.exports = {
    addUser,
    checkUser,
    removeUser,
    updatePassword,
    getPassword
};