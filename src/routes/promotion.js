const express = require('express')
const route = express.Router();

const promotionController = require('../app/controllers/PromotionController')

route.get('/danhsachkhuyenmai', promotionController.danhsachKhuyenMai)
route.get('/themkhuyenmai', promotionController.themKhuyenMai)
route.get('/', promotionController.index)

module.exports = route