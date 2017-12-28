const express = require('express')
const router = express.Router();
const csrf = require('csurf')

const passport = require('passport')
const Strategy = require('passport-twitter').Strategy

router.use(csrf())

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

// GET / 
router.get('/', isLoggedIn, function (req, res, next) {
    res.redirect('/polls')
});

// if not authanticated
router.use('/', notLoggedIn, function (req, res, next) {
    // passport.authenticate('twitter')
    next();
});

router.post('/signin', passport.authenticate('twitter', {
    successRedirect: '/user/polls',
    failureRedirect: '/user/signin',
}));

app.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/')
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }

    res.redirect('/')
}