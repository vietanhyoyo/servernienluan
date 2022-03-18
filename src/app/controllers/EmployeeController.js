
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const NhanVien = require('../models/NhanVien')
const bcrypt = require('bcrypt-nodejs')

class EmployeeController{
    index(req, res){
        res.send('NHAN VIEN');
    }

    /**'/employee/themnhanvien' */
    async themNhanVien(req, res) {
        const mk = await bcrypt.hashSync('12345678', bcrypt.genSaltSync(5), null)
        const nhanvien = new NhanVien({
            hoten: 'Hồ Quang Hiếu',
            sdt: '9876543210',
            matkhau: mk,
            gioitinh: 'nam',
            ngaysinh: new Date('07/03/2000'),
            hinhanh: 'https://avatarfiles.alphacoders.com/201/201013.png',
            diachi: 'đ 30/4',
            chucvu: 'admin'
        });
        nhanvien.save()
            .then(() => res.json(nhanvien));
    }
}

module.exports = new EmployeeController;