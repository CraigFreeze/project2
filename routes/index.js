const routes = require('express').Router();
const passport = require('passport'); 

routes.use('/', require('./swagger'));
const controller = require('../controllers/index.js');

routes.get('/', controller.base);
routes.use('/clients', require('./clients.js'))
routes.use('/notes', require('./notes.js'))

routes.get('/login', passport.authenticate('github'), (req, res) => { });

routes.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


module.exports = routes;