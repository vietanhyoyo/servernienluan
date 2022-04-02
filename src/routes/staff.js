const express = require('express');
const route = express.Router();
const StaffController = require('../app/controllers/StaffController')

route.get('/', StaffController.index)

module.exports = route;