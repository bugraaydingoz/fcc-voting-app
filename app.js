'use strict';

//mongoose file must be loaded before all other files in order to provide
// models to other modules
var mongoose = require('./mongoose'),
  passport = require('passport'),
  express = require('express'),
  session = require('express-session'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt'),
  router = express.Router(),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  request = require('request'),
  twitterConfig = require('./config/twitter.config.js');

mongoose();

var User = require('mongoose').model('User');
var passportConfig = require('./passport');

const auth = require('./routes/auth')
const polls = require('./routes/polls')

//setup configuration for facebook login
passportConfig();

var app = express();

app.use(express.static(path.join(__dirname, 'client/build')))

// enable cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

//rest API requirements
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());
// app.use(session({
//   secret: 'voting_app',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 180 * 60 * 1000
//   }
// }));
// app.use(passport.initialize())
// app.use(passport.session)

app.use('/api/auth', auth)
app.use('/api/polls', polls)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 4000
app.listen(port)
module.exports = app;

console.log('Server running at http://localhost:4000/');