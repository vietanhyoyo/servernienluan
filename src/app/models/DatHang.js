const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DatHang = new Schema({
    khachhang: { type: Schema.Types.ObjectId, ref: 'KhachHang' },
    trangthai: { type: String, maxlength: 50 },
    ngaydat: { type: Date, default: Date.now },
    ngayduyet: { type: Date },
    tongtien: { type: Number, default: 0 }
})

module.exports = mongoose.model('DatHang', DatHang, 'dathang')