const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cors = require("cors");

require('dotenv').config()

const {createTables} = require("./db/generalDBController");
createTables()

const app = express();

app.use(cors())

{
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));
}


const registerRouter = require('./routes/register')
app.use('/register', registerRouter);
const loginRouter = require('./routes/login')
app.use('/login', loginRouter);
const testRouter = require('./routes/test')
app.use('/test', testRouter);
const getFilesRouter = require('./routes/getFiles')
app.use('/getFiles', getFilesRouter);
const downloadFileRouter = require('./routes/downloadFile')
app.use('/download', downloadFileRouter);
const addFolderRouter = require('./routes/addFolder')
app.use('/addfolder', addFolderRouter);
const addFileRouter = require('./routes/addFile')
app.use('/addfile', addFileRouter);
const removeFileRouter = require('./routes/removeFile')
app.use('/removefile', removeFileRouter);

module.exports = app;
