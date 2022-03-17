const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')


const KhachHang = new Schema({
    hoten: { type: String, require: true },
    sdt: { type: String, maxlength: 10, unique: true, require: true },
    matkhau: { type: String, require: true},
    gioitinh: { type: String, maxlength: 10 },
    hinhanh: { type: String, maxlength: 255, default: '../images/no-avatar.png' },
    diachi: { type: String, maxlength: 255 },
    quanhuyen: { type: Schema.Types.ObjectId, ref: 'QuanHuyen' },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

KhachHang.method.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
}

KhachHang.method.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('KhachHang', KhachHang, 'khachhang')