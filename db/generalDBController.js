const con = require("./props");

const createTables = () => {
    con.connect(function (err) {
        if (err) console.log("ERROR WITH MYSQL CONNECTION\n" + err, {color: "red"});

        let sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, password VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("CAN'T CREATE TABLE");
                console.log(err)
            }
            console.log("Table users created");
        });
    });
};

module.exports = {
    createTables
};