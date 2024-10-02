const routes = require('express').Router();

routes.use('/', require('./swagger'));
const controller = require('../controllers/index.js');

routes.get('/', controller.base);

routes.use('/clients', require('./clients.js'))
routes.use('/notes', require('./notes.js'))

module.exports = routes;