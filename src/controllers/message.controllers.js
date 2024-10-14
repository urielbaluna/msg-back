const { request, response } = require('express');
const generateID = require('../utils/generateID.js');
const client = require('../database/connect.js');

async function createMessage(req = request, res = response) {
    const {date, usr_emit, msg, usr_dest, status} = req.body;
    if (!date || !usr_emit || !msg || !usr_dest || !status) {
        return res.status(422).json({
            msg: 'No se puede guardar un mensaje vacio'
        });
    }
    try {
        const id = generateID();
        console.log(id);
        console.log(date, usr_emit, msg, usr_dest, status);
        const msgAdded = await client.batch([{
            sql: `INSERT INTO messages (id, date, usr_emit, msg, usr_dest, status) VALUES (?, ?, ?, ?, ?, ?)`,
            args: [ id, date, usr_emit, msg, usr_dest, status]   
        }], "write");
        console.log(msgAdded);
        return res.status(201).json({
            msg: 'Mensaje guardado'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

async function getMessages(req = request, res = response) {
    try {
        const messages = await client.execute('SELECT * FROM messages');
        return res.status(200).json({
            messages: messages.rows
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

async function updateStatusMessage(req = request, res = response) {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.status(422).json({
            msg: 'No se puede actualizar un mensaje sin estado'
        });
    }
    try {
        await client.batch([{
            sql: `UPDATE messages SET status = ? WHERE id = ?`,
            args: [status, id]
        }], "write");
        return res.status(200).json({
            msg: 'Mensaje actualizado'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal server error'
        });
    }
    
}

async function getAllChat(req = request, res = response) {
    const { usr_emit, usr_dest } = req.body;
    try {
        const usr_dest2 = usr_dest;
        const usr_emit2 = usr_emit;
        const chat = await client.execute('SELECT * FROM messages WHERE usr_emit = ? AND usr_dest = ? OR usr_emit = ? AND usr_dest = ?', [usr_emit, usr_dest, usr_dest2, usr_emit2]);
        return res.status(200).json({
            chat: chat.rows
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal server error'
        });
        
    }
}

async function getLastestMessagesOfChat(req = request, res = response) {
    const { usr_emit, usr_dest, dateLastMessage } = req.body;
    try {
        const usr_dest2 = usr_dest;
        const usr_emit2 = usr_emit;
        const chat = await client.execute('SELECT * FROM messages WHERE usr_emit = ? AND usr_dest = ? OR usr_emit = ? AND usr_dest = ?', [usr_emit, usr_dest, usr_dest2, usr_emit2]);
        return res.status(200).json({
            chat: chat.rows
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal server error'
        });
    }
}

module.exports = {
    createMessage,
    getMessages,
    updateStatusMessage,
    getAllChat,
};