const Poll = require('../models/poll')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/voting_app')

const polls = [
    new Poll({
        id: 1,
        name: "Which subject you will like more?",
        options: ["Math", "Physics", "Programming", "Sports"],
        data: [5, 2, 12, 3],
        createdAt: Date(),
        createdBy: "Bugra Aydingoz"
    }),
    new Poll({
        id: 2,
        name: "What is your favourite color?",
        options: ["Blue", "Red", "Yellow", "Green"],
        data: [10, 7, 2, 13],
        createdAt: Date(),
        createdBy: "Bugra Aydingoz"
    }),
    new Poll({
        id: 3,
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