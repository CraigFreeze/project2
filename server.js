const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongodb = require('./data/database.js');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = 3000;

// Middle Ware
app.use(bodyParser.json())
//Basic express sesssion({..}) initialization.
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}))
// init passport to use "express-session"
app.use(passport.initialize())
//allow passport to use "express-session"
app.use(passport.session())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Orgin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
app.use(cors({ origin: '*' }))
app.use('/', require('./routes/index.js')); //Routes

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
))

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
})

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: 'api-docs', session: false
}), 
(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
})

// Server Start
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.port || port);
    console.log(`Connected to DB and listening on ${process.env.port || 3000}`);
  }
});