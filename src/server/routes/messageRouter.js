const express = require('express');

const messageControler = require('../controllers/messageController');

const messageRouter = express.Router();

messageRouter.get('/', messageControler.get);

module.exports = messageRouter;