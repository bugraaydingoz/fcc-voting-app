var express = require('express')
var router = express.Router()

const Poll = require('../models/poll')
const mongoose = require('mongoose')
mongoose.connect('mongodb://bugra:bugra@ds153198.mlab.com:53198/ba_voting_app', {
    useMongoClient: true
})
mongoose.Promise = global.Promise


// POST /vote
router.post('/vote', function (req, res, next) {

    const id = req.body.id
    const vote = req.body.vote
    const dataIndex = req.body.dataIndex
    const isNewOption = req.body.isNewOption
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress

    try {
        Poll.findOne({
            _id: id
        }, (err, result) => {
            if (err) throw err

            let _poll = result
            let _ip = _poll.ip_adresses.find(ip)

            if (!_ip) {
                if (!isNewOption) {
                    _poll.data[dataIndex]++;
                    _poll.ip_adresses.push(ip)
                }
                // If user vote for a new option
                else {
                    _poll.data.push(1)
                    _poll.options.push(vote)
                    _poll.ip_adresses.push(ip)
                }

                Poll.update({
                    _id: id
                }, _poll, (err, result) => {
                    if (err) throw err
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(result));
                })
            }
        })
    } catch (e) {
        throw e
    }

    res.end()
});

// POST /new
router.post('/new', function (req, res, next) {
    const _name = req.body.name
    const _options = req.body.options
    const _userId = req.body.userId

    try {
        let newPoll = new Poll({
            name: _name,
            options: _options,
            data: Array.apply(null, Array(_options.length)).map(Number.prototype.valueOf, 0),
            createdAt: Date(),
            createdBy: _userId
        })

        newPoll.save((err, result) => {
            if (err) throw err
            // console.log(result)
            res.send(JSON.stringify(result))
        })

    } catch (error) {
        throw error
    }
    // res.end()
})

// POST /delete/:id
router.post('/delete/', function (req, res, next) {
    const _pollId = req.body.pollId
    const _userId = req.body.userId

    try {
        Poll.findOne({
            _id: _pollId
        }).remove((err, result) => {
            if (err) throw err
            res.end()
        })
    } catch (error) {
        throw error
    }
    res.end()
})

// // POST /update/:id
// router.post('/update/:id', isLoggedIn, function (req, res, next) {
//     // update poll if authanticated
//     res.redirect('/')
// })

// GET /user/:userId
router.get('/user/:userId', function (req, res) {
    let userId = req.params.userId

    try {
        Poll.find({
            createdBy: userId
        }, (err, result) => {
            if (err) throw err
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        })
    } catch (error) {
        throw error
    }
})

// GET /:id
router.get('/:id', function (req, res, next) {
    let pollId = req.params.id

    if (mongoose.Types.ObjectId.isValid(pollId)) {
        try {
            Poll.findOne({
                _id: pollId
            }, (err, result) => {
                if (err) throw err
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            })
        } catch (error) {
            throw error
        }
    } else {
        res.json(null)
    }
});

// GET /
router.get('/', function (req, res, next) {
    try {
        Poll.find((err, result) => {
            if (err) throw err
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        })
    } catch (error) {
        throw error
    }
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