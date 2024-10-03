const db = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const createNote = async (req, res) => {
    const note = {
        agent_id: req.body.agent_id,
        client_id: req.body.client_id,
        comment: req.body.comment,
        follow_up: req.body.follow_up,
        follow_up_on: req.body.follow_up_on
    }
    const response = await db.getDb().db().collection('note').insertOne(note);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.')
    }
}

const updateNote = async (req, res) => {
    const noteId = new ObjectId(req.params.id)
    const note = {
        agent_id: req.body.agent_id,
        client_id: req.body.client_id,
        comment: req.body.comment,
        follow_up: req.body.follow_up,
        follow_up_on: req.body.follow_up_on
    }
    const response = await db.getDb().db().collection('note').replaceOne({ _id: noteId }, note);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.')
    }
}

module.exports = {
    createNote, updateNote
}