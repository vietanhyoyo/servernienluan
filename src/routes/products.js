const express = require('express')
const route = express.Router();

const productsController = require('../app/controllers/ProductsController')

/**Cap nhat */
route.get('/capnhatgiasanpham', productsController.capnhatGiaSanPham)
/**Hien thi */
route.post('/sanphamtheoloaisanpham', productsController.traveSanPhamtheoIDLoaiSanPham)
route.get('/loaihang', productsController.danhsachLoaiHang)
route.get('/loaisanpham',productsController.danhsachLoaiSanPham)
route.get('/sanpham', productsController.danhsachSanPham)
route.get('/loaihangloaisanpham', productsController.danhsachLoaiHangvaLoaiSanPham)
route.get('/timidloaihangsangloaisanpham', productsController.timIdLoaiHangsangLoaiSanPham)
/**Them */
route.get('/themsanpham', productsController.themSanPham)
route.post('/themloaihang', productsController.themLoaiHang)
route.post('/themloaisanpham', productsController.themLoaiSanPham)
route.get('/themgiasanpham', productsController.themGiaSanPham)
/**Xoa */
route.post('/xoaloaihang', productsController.xoaLoaiHangID)
route.post('/xoaloaisanpham', productsController.xoaLoaiSanPhamID)
/**Sửa */
route.post('/sualoaihang', productsController.suaLoaiHangID)
route.post('/sualoaisanpham', productsController.suaLoaiSanPhamID)
/**index */
route.get('/:slug', productsController.show)
route.get('/', productsController.index)

module.exports = route