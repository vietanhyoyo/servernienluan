const express = require('express')
const route = express.Router();

const orderController = require('../app/controllers/OrderController')

route.get('/capnhatdathang', orderController.capnhatDatHang)
route.post('/hienthigiohang', orderController.hienThiGioHang)
route.post('/themchitietdathang', orderController.themChiTietDatHang)
route.get('/themdathang', orderController.themDatHang)
route.get('/', orderController.index)

module.exports = route