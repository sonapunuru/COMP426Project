var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var sqlite3 = require('sqlite3').verbose();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postCrush = require("./routes/postCrush");
var getCrushes = require("./routes/getCrushes");

var app = express();

const db = new sqlite3.Database('./database.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS Users 
        (Onyen TEXT PRIMARY KEY, 
            Name TEXT,
            Email TEXT)`);

db.run(`CREATE TABLE IF NOT EXISTS Crushes 
        (CrushID INTEGER PRIMARY KEY AUTOINCREMENT, 
            CrusherOnyen TEXT,
            CrushOnyen TEXT,
            Crush TEXT, 
            Message TEXT,
            FOREIGN KEY (CrusherOnyen) REFERENCES Users (Onyen),
            FOREIGN KEY (CrushOnyen) REFERENCES Users (Onyen))`);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/postCrush", postCrush);
app.use("/getCrushes", getCrushes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.render('error');
});

module.exports = app;
