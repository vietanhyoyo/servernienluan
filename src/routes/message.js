const express = require('express');
const route = express.Router();
const messageController = require('../app/controllers/MessageController')

route.get('/themtinnhan', messageController.themTinNhan)
route.get('/', messageController.index)

module.exports = route;
