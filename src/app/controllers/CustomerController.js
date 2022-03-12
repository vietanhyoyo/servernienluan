const KhachHang = require('../models/KhachHang')
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs')

class CustomerController {
    /**'/customer' */
    index(req, res) {
        res.send('CUSTOMER');
    }
    /**'/customer/themkhachhang' */
    themKhachHang(req, res) {
        const khachhang = new KhachHang({
            hoten: 'Lê Thị B',
            sdt: '0121231539',
            makhau: bcrypt.hashSync('123456', bcrypt.genSaltSync(5), null),
            gioitinh: 'nữ',
            hinhanh: 'https://mayvesinhmiennam.com/wp-content/uploads/2021/06/j6.jpg',
            diachi: 'đ Mậu Thân',
            quanhuyen: '6221baaf5bd2fa44e9896439',
        });
        khachhang.save()
            .then(() => console.log('Them Khach Hang'));
    }
    /**'/customer/danhsachkhachhang' */
    async danhsachKhachHang(req, res) {
        const khachhang = await KhachHang.find({}).populate({ path: 'quanhuyen', model: 'QuanHuyen'});
        res.json(khachhang);
    }
    /**'/customer/danhsachkhachhangmatkhau' */
    async danhsachKhachHangMatKhau(req, res) {
        const khachhang = await KhachHang.find({}).populate('hoten','matkhau');
        res.json(khachhang);
    }
}

module.exports = new CustomerController;