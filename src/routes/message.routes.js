const express = require('express');
const { createMessage, getMessages, updateStatusMessage, getAllChat } = require('../controllers/message.controllers.js');
const routes = express.Router();

routes.post('/create', createMessage);
routes.get('/', getMessages);
routes.put('/update/:id', updateStatusMessage);
routes.get('/getAllChat', getAllChat);

module.exports = routes;