var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
// var User = require('../models/user');

const ConsumerKey = 'botfwLpmL0M9t2ZOc042Lfm9k'
const ConsumerSecret = 'LRw4ARqY21PQX51gLxxOIPeGzJC7mctV2EO2d9WUNyPbqkQs8y'

passport.use(new Strategy({
        consumerKey: ConsumerKey,
        consumerSecret: ConsumerSecret,
        callbackURL: 'http://127.0.0.1:3000/user/login/return'
    },
    function (token, tokenSecret, profile, cb) {
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});