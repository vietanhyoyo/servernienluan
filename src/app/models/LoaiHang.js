
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LoaiHang = new Schema({
    tenloaihang: { type: String, maxLength: 255, unique: true }
})

module.exports = mongoose.model('LoaiHang', LoaiHang, 'loaihang')