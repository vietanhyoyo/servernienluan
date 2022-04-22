
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const GiaSanPham = new Schema({
    sanpham: { type: Schema.Types.ObjectId, ref: 'SanPham', require: true },
    khuyenmai: { type: Schema.Types.ObjectId, ref: 'KhuyenMai', default: null },
    giaban: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

module.exports = mongoose.model('GiaSanPham', GiaSanPham, 'giasanpham')