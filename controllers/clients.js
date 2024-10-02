const db = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const createClient = async (req, res) => {
    //#swagger.tags=['Clients']
    const client = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        gender: req.body.gender,
        marital_status: req.body.marital_status,
        ssn: req.body.ssn,
        medicare_number: req.body.medicare_number,
        aca_id: req.body.aca_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    }
    const response = await db.getDb().db().collection('client').insertOne(client);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.')
    }
}

const updateClient = async (req, res) => {
    //#swagger.tags=['Clients']
    const clientId = new ObjectId(req.params.id)
    const client = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        gender: req.body.gender,
        marital_status: req.body.marital_status,
        ssn: req.body.ssn,
        medicare_number: req.body.medicare_number,
        aca_id: req.body.aca_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    }
    const response = await db.getDb().db().collection('client').replaceOne({ _id: clientId }, client);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user.')
    }
}

module.exports = {
    createClient, updateClient
}