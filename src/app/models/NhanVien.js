const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const NhanVien = new Schema({
    hoten: { type: String, require: true },
    sdt: { type: String, maxlength: 12 },
    makhau: { type: String, require: true },
    gioitinh: { type: String, maxlength: 10 },
    ngaysinh: { type: Date },
    hinhanh: { type: String, maxlength: 255 },
    diachi: { type: String, maxlength: 255 },
    quanhuyen: { type: Schema.Types.ObjectId, ref: 'QuanHuyen' },
    chucvu: { type: String, maxlength: 50 },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

NhanVien.method.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

NhanVien.method.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('NhanVien', NhanVien, 'nhanvien')