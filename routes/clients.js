const express = require('express');
const routes = express.Router();
const { mongoIdValidationRules, clientValidationRules, validate } = require('../validator.js')

const indexController = require('../controllers/index.js')
const clientsController = require('../controllers/clients.js');
const { isAuthenticated } = require("../middleware/authenticate.js")


routes.get('/', indexController.getAll('client'))

routes.get('/:id', isAuthenticated, mongoIdValidationRules(), validate, indexController.getOne('client'))

routes.post('/', isAuthenticated, clientValidationRules(), validate , clientsController.createClient)

routes.put('/:id', isAuthenticated, clientValidationRules(), validate, clientsController.updateClient)

routes.delete('/:id', isAuthenticated, mongoIdValidationRules(), validate, indexController.deleteOne('client'))


module.exports = routes;