const KhachHang = require('../models/KhachHang')
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs');

class CustomerController {
    /**'/customer' */
    index(req, res) {
        res.send('CUSTOMER');
    }
    /**'/customer/themkhachhang' */
    async themKhachHang(req, res) {
        const data = req.body;
        let insert = true;
        let mk = '';

        await KhachHang.find({ sdt: data.phone })
            .then((kh) => {
                if (kh.length !== 0) {
                    res.send('Số điện thoại đã được sử dụng!');
                    insert = false;
                }
            })
        /*Ma hoa mat khau */
        mk = await bcrypt.hashSync(data.password,bcrypt.genSaltSync(5),null);

        const khachhang = new KhachHang({
            hoten: data.name,
            sdt: data.phone,
            matkhau: mk,
        });

        if (insert)
            khachhang.save()
                .then(() => res.send(khachhang))
                .catch(() => res.send('Đã có lỗi!'))

    }
    /**'/customer/danhsachkhachhang' */
    async danhsachKhachHang(req, res) {
        const khachhang = await KhachHang.find({}).populate({ path: 'quanhuyen', model: 'QuanHuyen' });
        res.json(khachhang);
    }
    /**'/customer/danhsachkhachhangmatkhau' */
    async danhsachKhachHangMatKhau(req, res) {
        const khachhang = await KhachHang.find({}).populate('hoten', 'matkhau');
        res.json(khachhang);
    }
}

module.exports = new CustomerController;