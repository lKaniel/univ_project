const fs = require("fs");
const path = require('path');

let getInnerFiles = (path)=>{
    const result = []
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            result.push(file)
        });
    });
    return result
}

let innitFolder = (email)=>{
    fs.mkdir(path.join("../files/", email), (err) => {
        if (err) {
            return console.error(err);
        }
        // console.log('Directory created successfully!');
    });
}

let addFolder = (email, path, name) => {
    fs.mkdir(path.join("../files/", email, path, name), (err) => {
        if (err) {
            return console.error(err);
        }
        // console.log('Directory created successfully!');
    });
}

module.exports = {
    getInnerFiles,
    innitFolder,
    addFolder
}