const express = require('express')
const route = express.Router();
const customerController = require('../app/controllers/CustomerController')

route.post('/infokhachhang', customerController.inFoKhachHang);
route.get('/danhsachkhachhangmatkhau', customerController.danhsachKhachHangMatKhau);
route.get('/danhsachkhachhang', customerController.danhsachKhachHang);
route.post('/themkhachhang', customerController.themKhachHang);
route.get('/', customerController.index);

module.exports = route; 
