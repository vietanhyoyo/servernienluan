const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChiTietDatHang = new Schema({
    dathang: { type: Schema.Types.ObjectId, ref: 'DatHang' },
    sanpham: { type: Schema.Types.ObjectId, ref: 'SanPham' },
    soluong: { type: Number },
    gia: { type: Number }
})

module.exports = mongoose.model('ChiTietDatHang', ChiTietDatHang, 'chitietdathang')