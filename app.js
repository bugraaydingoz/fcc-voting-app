// PORT=3001 node bin/www
// in client npm start
// 

const express = require('express');
const passport = require('passport')
const Strategy = require('passport-twitter').Strategy
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')

const index = require('./routes/index');
const user = require('./routes/user');
const polls = require('./routes/polls');

const app = express();
require('./config/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'my_secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/polls', polls);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;