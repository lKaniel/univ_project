const fs = require("fs");
const path = require('path');
const rimraf = require("rimraf");

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
            for (const file of files) {
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

let addFolder = (email, pathh, name) => {
    return new Promise(function (resolve, reject) {
        fs.mkdir(path.join(__dirname, "../files", email, pathh, name), (err) => {
            resolve(!err);
        });
    })
}

let addFile = async (email, pathh, file) => {
        const res = await file.mv(path.join(__dirname, "../files", email, pathh, file.name));
        return res;
}

let getFile = (email, file) => {
    return path.join(__dirname, "../files", email, file)
}

let removeFile = (email, pathh, file) => {
    return new Promise(function (resolve, reject) {
        rimraf(path.join(__dirname, "../files", email, pathh, file), () => {
            resolve(true)
        });
    })
}


module.exports = {
    getInnerFiles,
    innitFolder,
    addFolder,
    addFile,
    getFile,
    removeFile
}