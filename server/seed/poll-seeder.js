const Poll = require('../models/poll')
const mongoose = require('mongoose')

mongoose.connect('mongodb://bugra:bugra@ds153198.mlab.com:53198/ba_voting_app')

const polls = [
    new Poll({
        name: "Which subject you will like more?",
        options: ["Math", "Physics", "Programming", "Sports"],
        data: [5, 2, 12, 3],
        createdAt: Date(),
        createdBy: "Bugra Aydingoz"
    }),
    new Poll({
        name: "What is your favourite color?",
        options: ["Blue", "Red", "Yellow", "Green"],
        data: [10, 7, 2, 13],
        createdAt: Date(),
        createdBy: "Bugra Aydingoz"
    }),
    new Poll({
        name: "Do you prefer Android or iOS?",
        options: ["Android", "IOS"],
        data: [22, 23],
        createdAt: Date(),
        createdBy: "Bugra Aydingoz"
    })
]

let done = 0
for (let i = 0; i < polls.length; i++) {
    polls[i].save((err, res) => {
        done++;
        if (done === polls.length) {
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}