
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const NhanVien = require('../models/NhanVien')
const bcrypt = require('bcrypt-nodejs')

class EmployeeController{
    index(req, res){
        res.send('NHAN VIEN');
    }

    /**'/employee/themnhanvien' */
    themNhanVien(req, res) {
        const nhanvien = new NhanVien({
            hoten: 'Lê Quốc Anh',
            sdt: '0999111153',
            makhau: bcrypt.hashSync('123456', bcrypt.genSaltSync(5), null),
            gioitinh: 'nam',
            ngaysinh: new Date('02/02/1997'),
            hinhanh: 'http://images6.fanpop.com/image/photos/36200000/Levi-Rivaille-Shingeki-no-Kyojin-image-levi-rivaille-shingeki-no-kyojin-36225480-440-545.png',
            diachi: 'đ 30/4',
            quanhuyen: '6221baaf5bd2fa44e9896439',
            chucvu: 'quản lý'
        });
        nhanvien.save()
            .then(() => console.log('Them Nhan Vien'));
    }
}

module.exports = new EmployeeController;