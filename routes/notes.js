const express = require('express');
const routes = express.Router();
const { mongoIdValidationRules, noteValidationRules, validate } = require('../validator.js')


const indexController = require('../controllers/index.js')
const notesController = require('../controllers/notes.js')

routes.get('/', indexController.getAll('note'))

routes.get('/:id', mongoIdValidationRules(), validate, indexController.getOne('note'))

routes.post('/', noteValidationRules(), validate, notesController.createNote)

routes.put('/:id', noteValidationRules(), validate, notesController.updateNote)

routes.delete('/:id', mongoIdValidationRules(), validate, indexController.deleteOne('note'))


module.exports = routes;