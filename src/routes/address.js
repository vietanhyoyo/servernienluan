const express = require('express')
const route = express.Router();

const addressController = require('../app/controllers/AddressController')

route.get('/quanhuyen', addressController.danhsachQuanHuyen)
route.get('/tinh', addressController.danhsachTinh)
route.get('/themquanhuyen', addressController.themQuanHuyen)
route.get('/themtinhtp', addressController.themTinhTP)
route.get('/', addressController.index)

module.exports = route