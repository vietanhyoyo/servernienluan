const KhachHang = require('../models/KhachHang')
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
           
            if (bool) {
                res.send(khachhang);
            }
            else {
                res.send('Sai mật khẩu!');
            }
        }
        else {
            res.send('Tài khoản bị sai!');
        }
    }
    /**Nhan gia tri session dang nhap */
    // laygiatrisessionDangNhap(req, res){
    //     if(req.session.username){
    //         res.send(req.session.username)
    //     }
    // }
}

module.exports = new LoginController;