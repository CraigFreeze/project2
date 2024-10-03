const db = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const base = (req, res) => {
    //#swagger.tags=['Contacts API']
    res.send("Insurance API")
}


const getAll = (collection) => {
    return async (req, res) => {
        const result = await db.getDb().db().collection(collection).find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    }
}

const getOne = (collection) => {
    return async (req, res) => {
        const id = new ObjectId(req.params.id)
        const result = await db.getDb().db().collection(collection).find({ _id: id });
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    }
}

const deleteOne = (collection) => {
    return async (req, res) => {
        const id = new ObjectId(req.params.id)
        const response = await db.getDb().db().collection(collection).deleteOne({ _id: id });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while deleting the object.')
        }
    }
}

module.exports = {
    base, getOne, getAll, deleteOne
}