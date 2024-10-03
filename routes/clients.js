const express = require('express');
const routes = express.Router();
const { mongoIdValidationRules, clientValidationRules, validate } = require('../validator.js')

const indexController = require('../controllers/index.js')
const clientsController = require('../controllers/clients.js');

routes.get('/', indexController.getAll('client'))

routes.get('/:id', mongoIdValidationRules(), validate, indexController.getOne('client'))

routes.post('/', clientValidationRules(), validate , clientsController.createClient)

routes.put('/:id', clientValidationRules(), validate, clientsController.updateClient)

routes.delete('/:id', mongoIdValidationRules(), validate, indexController.deleteOne('client'))


module.exports = routes;