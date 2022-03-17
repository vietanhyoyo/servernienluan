const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SanPham = new Schema({
    tensanpham: { type: String, maxLength: 255, unique: true },
    mota: { type: String, maxLength: 1200 },
    hinhanh: [{ type: String, maxLength: 255 }],
    loaisanpham: {
        type: Schema.Types.ObjectId,
        ref: 'LoaiSanPham'
    },
    gianiemyet: { type: Number, default: 10 },
    trangthai: { type: String, maxlength: 255 },
    soluong: { type: Number, default: 0 },
    donvitinh: { type: String, maxlength: 255 },
    nhacungcap: { type: String, maxlength: 255 },
    sanphamcungloai: [{ type: Schema.Types.ObjectId, ref: 'SanPham' }],
    daban: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

module.exports = mongoose.model('SanPham', SanPham, 'sanpham')