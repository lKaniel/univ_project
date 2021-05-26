const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

require('dotenv').config()

const {createTables} = require("./db/generalDBController");
createTables()

const app = express();

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

module.exports = app;
