const express = require('express')
const route = express.Router();

const promotionController = require('../app/controllers/PromotionController')
const priceController = require('../app/controllers/PriceController')


/**Xóa */
route.post('/xoasanpham', promotionController.xoaSanPham)
route.post('/xoakhuyenmai', promotionController.xoaKhuyenMai)
/**Xem */
route.get('/danhsachkhuyenmai', promotionController.danhsachKhuyenMai)
/**Thêm */
route.post('/themsanpham', promotionController.themSanPhamVaoKhuyenMai)
route.post('/themkhuyenmai', promotionController.themKhuyenMai)
route.get('/', promotionController.index)


module.exports = route