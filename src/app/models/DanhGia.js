const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DanhGia = new Schema({
    sanpham: {type: Schema.Types.ObjectId, ref: 'SanPham'},
    noidung: { type: String, maxlength: 255 },
    hinhanh: { type: String, maxlength: 255 },
    tacgia: { type: Schema.Types.ObjectId },
    luocthich: { type: Number, default: 0 },
    diemdanhgia: { type: Number, require: true, min: 1, max: 5},
    ngay: { type: Date, default: Date.now },
}, {
    timestamps: true
})

module.exports = mongoose.model('DanhGia', DanhGia, 'danhgia')