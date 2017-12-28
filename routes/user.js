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
    next();
});

router.get('/signin', function (req, res, next) {
    res.json('', {
        csrfToken: req.csrfToken()
    });
});

router.post('/signin', passport.authenticate('twitter', {
    successRedirect: '/user/polls',
    failureRedirect: '/user/signin',
}));




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