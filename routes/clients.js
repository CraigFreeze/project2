const express = require('express');
const routes = express.Router();

const indexController = require('../controllers/index.js')
const clientsController = require('../controllers/clients.js')

routes.get('/', indexController.getAll('client'))

routes.get('/:id', indexController.getOne('client'))

routes.post('/', clientsController.createClient)

routes.put('/:id', clientsController.updateClient)

routes.delete('/:id', indexController.deleteOne('client'))


module.exports = routes;