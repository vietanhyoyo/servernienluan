const express = require('express');
const route = express.Router();
const multer = require('multer');

const productsController = require('../app/controllers/ProductsController')
/**Khai bao noi luu file */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/productimages');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

/**Cap nhat */
route.get('/capnhatgiasanpham', productsController.capnhatGiaSanPham)
/**Hien thi */

//route.get('/hinhanh', productsController.layHinhAnh)
route.post('/timtensanpham', productsController.timtenSanPham)
route.post('/loaisanphamid', productsController.traveLoaiSanPhamID)
route.post('/sanphamtheoloaisanpham', productsController.traveSanPhamtheoIDLoaiSanPham)
route.get('/loaihang', productsController.danhsachLoaiHang)
route.get('/loaisanpham', productsController.danhsachLoaiSanPham)
route.get('/sanpham', productsController.danhsachSanPham)
route.get('/loaihangloaisanpham', productsController.danhsachLoaiHangvaLoaiSanPham)
route.get('/timidloaihangsangloaisanpham', productsController.timIdLoaiHangsangLoaiSanPham)
route.post('/hienthisanpham', productsController.hienthiSanPham)

/**Them */
route.post('/themsanphamhinhanh', upload.array('fileImage',12), productsController.themSanPhamHinhAnh)
route.post('/themsanpham', productsController.themSanPham)
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