const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs');
const DanhGia = require('../models/DanhGia');

class EvaluateController {
    index(req, res) {
        res.send('Đánh giá');
    }

    /**'/evaluate/themnhanvien' */
    themDanhGia(req, res) {
        const danhgia = new DanhGia({
            sanpham: '622360830078ccaedbd24efd',
            noidung: 'Tuyệt vời',
            tacgia: '6222074677fda53eaa054761',
            diemdanhgia: 5
        })
        danhgia.save()
            .then(() => res.json(danhgia));
    }
}

module.exports = new EvaluateController;