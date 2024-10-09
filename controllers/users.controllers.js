const { request, response } = require('express');
const generateID = require('../utils/generateID.js');
const client = require('../database/connect.js');

async function createMessage(req = request, res = response) {
    const {date, usr_emit, msg, usr_dest} = req.body;
    if (!date || !usr_emit || !msg || !usr_dest) {
        return res.status(422).json({
            msg: 'No se puede guardar un mensaje vacio'
        });
    }
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
}