
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LoaiSanPham = new Schema({
    tenloaisanpham: { type: String, maxLength: 255, unique: true },
    loaihang: { type: Schema.Types.ObjectId, ref: 'LoaiHang' }
}, {
    timestamps: true
})

module.exports = mongoose.model('LoaiSanPham', LoaiSanPham, 'loaisanpham')