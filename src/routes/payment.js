const express = require('express')
const route = express.Router();

const paymentController = require('../app/controllers/PaymentController')

route.post('/dathang', paymentController.dathang)
route.post('/thanhtoan', paymentController.thanhtoan)
route.get('/', paymentController.index)

module.exports = route