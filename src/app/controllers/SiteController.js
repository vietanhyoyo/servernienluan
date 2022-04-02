const Mongoose = require('mongoose')
const ID = Mongoose.Types.ObjectId;
const priceController = require('./PriceController')
const DoanhSo = require('../models/DoanhSo');
const SanPham = require('../models/SanPham');


class SiteController {

    index(req, res){
        res.send('Home')
    }

    async updateTime(req, res) {

        const doanhso = await priceController.taoDoanhSoTrongNgay();
        if (doanhso === null) {
            await priceController.capNhatKhuyenMaiTrongNgay();
            const sanpham = await SanPham.find({});
            if (sanpham !== null) {
                for (let i = 0; i < sanpham.length; i++) {
                    await priceController.capNhatGiaSanPhamTheoKhuyenMai(sanpham[i]._id);
                }
            }
        }

        res.send('home')
    }


}

module.exports = new SiteController;