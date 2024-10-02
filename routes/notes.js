const express = require('express');
const routes = express.Router();

const indexController = require('../controllers/index.js')
const notesController = require('../controllers/notes.js')

routes.get('/', indexController.getAll('note'))

routes.get('/:id', indexController.getOne('note'))

routes.post('/', notesController.createNote)

routes.put('/:id', notesController.updateNote)

routes.delete('/:id', indexController.deleteOne('note'))


module.exports = routes;