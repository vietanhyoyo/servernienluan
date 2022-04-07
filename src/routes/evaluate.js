const express = require('express');
const route = express.Router();
const evaluateController = require('../app/controllers/EvaluateController')

/**Hien thi */
route.post('/danhgia', evaluateController.danhsachDanhGia)
route.post('/laydanhgia', evaluateController.layDanhGia)
/**Them danh gia */
route.post('/themdanhgia', evaluateController.themDanhGia)
route.get('/themdanhgiatest', evaluateController.themDanhGiaTest)
route.get('/', evaluateController.index)

module.exports = route;