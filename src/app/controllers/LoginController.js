const KhachHang = require('../models/KhachHang')
const NhanVien = require('../models/NhanVien')
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs')

class LoginController {
    /**'/login' */
    index(req, res) {
        res.send('Login');
    }
    /**Đăng nhập /login/dangnhap*/
    async dangnhap(req, res) {
        //req.session.username = req.body.name;
        const khachhang = await KhachHang.findOne({ sdt: req.body.name });
        if (khachhang !== null) {
            const bool = bcrypt.compareSync(req.body.password, khachhang.matkhau);
            if (bool) {res.send(khachhang);}
            else {res.send('Sai mật khẩu!');}
        }
        else {res.send('Tài khoản bị sai!');}
    }
    /**Nhan gia tri session dang nhap */
    // laygiatrisessionDangNhap(req, res){
    //     if(req.session.username){
    //         res.send(req.session.username)
    //     }
    // }
    async layuserDangNhap(req, res){
        const data = req.body.id;
        const user = await KhachHang.findById(data);
        if(user!==null){
            res.send(user);
        }else res.send('Khong tim thay')
    }

    // async layTaiKhoan(req, res){
    //     const KH = await KhachHang.find();
    //     const NV = await NhanVien.find();
    //     const TaiKhoan = KH.concat(NV);

    //     res.send(TaiKhoan);

    // }
}

module.exports = new LoginController;