var express = require('express')
var router = express.Router()
const csrf = require('csurf')

const Poll = require('../models/poll')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/voting_app', {
    useMongoClient: true
})
mongoose.Promise = global.Promise

router.use(csrf())

// POST /vote
router.post('/vote', function (req, res, next) {

    const id = req.body.id
    const vote = req.body.vote
    const dataIndex = req.body.dataIndex

    Poll.findOne({
        id: id
    }, (err, result) => {
        if (err) throw err

        let _poll = result
        _poll.data[dataIndex]++

            Poll.update({
                id: id
            }, _poll, (err, result) => {
                if (err) throw err
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            })
    })
});

// POST /new
router.post('/new', isLoggedIn, function (req, res, next) {
    // create new poll if authanticated
    res.redirect('/')
})

// POST /delete/:id
router.post('/delete/:id', isLoggedIn, function (req, res, next) {
    // delete poll if authanticated
    res.redirect('/')
})

// POST /update/:id
router.post('/update/:id', isLoggedIn, function (req, res, next) {
    // update poll if authanticated
    res.redirect('/')
})

// GET /:id
router.get('/:id', function (req, res, next) {
    let pollId = req.params.id
    Poll.findOne({
        id: pollId
    }, (err, result) => {
        if (err) throw err
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    })
});

// GET /
router.get('/', function (req, res, next) {
    Poll.find((err, result) => {
        if (err) throw err
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    })
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