const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Wy?T*wN~pm%dfSp5Epzsa",
    port: 3306,
    // insecureAuth : true,
    database: "univ_project"
});

module.exports = con;