
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const KhuyenMai = new Schema({
    tenkhuyenmai: { type: String, maxLength: 255, unique: true },
    ngaybd: { type: Date, default: Date.now },
    ngaykt: { type: Date },
    phantram: { type: Number },
    trangthai: { type: Number },
    danhsachsanpham: [{ type: Schema.Types.ObjectId, ref: 'SanPham' }],
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

module.exports = mongoose.model('KhuyenMai', KhuyenMai, 'khuyenmai')