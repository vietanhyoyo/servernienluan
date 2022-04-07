const express = require('express');
const route = express.Router();
const messageController = require('../app/controllers/MessageController')

/**Tra ve tin Nhan */
route.post('/laytinnhankhachhang', messageController.layTinNhanKhachHang)
route.get('/danhsachkhachhang', messageController.laydsKhachHang)

/**Thêm tin nhan */
route.post('/themtinnhannhanvien', messageController.themTinNhanDenKhachHang)
route.post('/themtinnhankhachhang', messageController.themTinNhanKhachHang)
route.get('/themtinnhan', messageController.themTinNhan)
route.get('/', messageController.index)

module.exports = route;
