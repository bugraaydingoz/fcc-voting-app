var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var User = require('../models/user');

const ConsumerKey = 'botfwLpmL0M9t2ZOc042Lfm9k'
const ConsumerSecret = 'LRw4ARqY21PQX51gLxxOIPeGzJC7mctV2EO2d9WUNyPbqkQs8y'


passport.use(new TwitterStrategy({
        consumerKey: ConsumerKey,
        consumerSecret: ConsumerSecret,
        callbackURL: "http://127.0.0.1:3000/user/twitter/callback"
    },
    function (token, tokenSecret, profile, cb) {
        User.findOrCreate({
            twitterId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});