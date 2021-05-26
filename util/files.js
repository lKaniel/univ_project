const fs = require("fs");
const path = require('path');

let isFile = (email, folder) => {
    return new Promise(function (resolve, reject) {
        fs.lstat(path.join(__dirname, "../files", email, folder), (err, stats) => {
            resolve(stats.isDirectory())
        });
    })
}

let getInnerFiles = (email, folder) => {
    return new Promise(function (resolve, reject) {
        fs.readdir(path.join(__dirname, "../files", email, folder), async (err, files) => {
            const result = []
            for (const file of files){
                const isItFile = await isFile(email, path.join(folder, file))
                result.push({file: file, isDir: isItFile})
            }
            resolve(result)
        });
    });
}

let innitFolder = (email) => {
    fs.mkdir(path.join(__dirname, "../files", email), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}

let addFolder = (email, path, name) => {
    fs.mkdir(path.join(__dirname, "../files", email, path, name), (err) => {
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