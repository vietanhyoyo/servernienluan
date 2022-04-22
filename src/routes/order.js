const express = require('express')
const route = express.Router();

const orderController = require('../app/controllers/OrderController')


/**Cập nhật */
route.post('/capnhatsoluongchitietdathang', orderController.capnhatSLChiTietDatHang)
route.post('/huydonhang', orderController.huyDonHang)
route.post('/xacnhandathang', orderController.xacNhanDatHang)
route.post('/tinhtongtiendathang', orderController.tinhTongTienDatHang)
route.get('/capnhatdathang', orderController.capnhatDatHang)
/**Hien thi */
route.post('/laydonhangcuakhachhang', orderController.layDonHangCuaKhachHang)
route.post('/laychitietdathang', orderController.layCacChiTietDatHang)
route.get('/laydonhangcanduyet', orderController.layDonHangCanDuyet)
route.post('/laygiohangthanhtoan', orderController.layGioHangThanhToan)
route.post('/hienthigiohang', orderController.hienThiGioHang)
/**Xóa */
route.post('/xoagiohang', orderController.xoaGioHang)
route.post('/xoachitietdathang',orderController.xoaChiTietDatHang)
/**Thêm */
route.post('/themchitietdathang', orderController.themChiTietDatHang)
route.get('/themdathang', orderController.themDatHang)
route.get('', orderController.index)

module.exports = route