const express = require('express');
const route = express.Router();
const evaluateController = require('../app/controllers/EvaluateController')


route.get('/themdanhgia', evaluateController.themDanhGia)
route.get('/', evaluateController.index)

module.exports = route;