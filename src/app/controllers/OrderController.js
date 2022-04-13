const DatHang = require('../models/DatHang')
const ChiTietDatHang = require('../models/ChiTietDatHang')
const DoanhSo = require('../models/DoanhSo')

class OrderController {

    index(req, res) {
        res.send('Order')
    }
    /** Hiển thị giỏ hàng */
    async hienThiGioHang(req, res) {
        const order = await DatHang.findOne({ khachhang: req.body.khachhang, trangthai: 'giỏ hàng' })
        if (order === null) {
            if (req.body.khachhang !== null)
                DatHang.create({ khachhang: req.body.khachhang, trangthai: 'giỏ hàng' }, doc => { res.send(doc) })
            else res.send([]);
        }
        else
            ChiTietDatHang.find({ dathang: order._id })
                .populate({ path: 'sanpham', model: 'SanPham' })
                .exec((err, doc) => {
                    if (err) res.send([]);
                    else res.send(doc);
                })
    }
    /** Xóa chi tiết đặt hàng*/
    async xoaChiTietDatHang(req, res) {
        const id = req.body.id;
        ChiTietDatHang.deleteOne({ _id: id })
            .then(() => res.send('dã xóa thành công'));
    }
    /**THêm đặt hàng */
    themDatHang(req, res) {
        const dathang = new DatHang({
            khachhang: '62220877e86f17e5c21810ac',
            trangthai: 'Chưa duyệt'
        })
        dathang.save()
            .then(() => res.json(dathang));
    }

    /**Them chi tiet dat hang */
    async themChiTietDatHang(req, res) {
        const Cart = await DatHang.findOne({ khachhang: req.body.khachhang, trangthai: 'giỏ hàng' })
        if (Cart !== null) {
            const chitietdathang = new ChiTietDatHang({
                dathang: Cart._id,
                sanpham: req.body.idSP,
                soluong: req.body.soluong
            });
            chitietdathang.save()
                .then(() => res.send(chitietdathang));
        }
        else {
            await DatHang.create({ khachhang: req.body.khachhang, trangthai: 'giỏ hàng' })
            const newCart = await DatHang.findOne({ khachhang: req.body.khachhang, trangthai: 'giỏ hàng' })
            const chitietdathang = new ChiTietDatHang({
                dathang: newCart._id,
                sanpham: req.body.idSP,
                soluong: req.body.soluong
            });
            chitietdathang.save()
                .then(() => res.send(chitietdathang));
            // res.send("that bai");
        }
    }

    /**Lấy giỏ hàng để tiến hành thanh toán */
    layGioHangThanhToan(req, res) {
        if (req.body.khachhang !== undefined) {
            DatHang.findOne({ khachhang: req.body.khachhang, trangthai: 'giỏ hàng' }, (err, doc) => {
                if (!err) res.send(doc);
                else res.send('Lỗi không tìm được giở hàng!');
            })
        } else res.send('Thất bại chưa có id khách hàng!')
    }

    /**Cap nhat trang thai da ban va tang doanh so*/
    /**Dang co loi Error */
    capnhatDatHang(req, res) {
        DatHang.findById(req.query.id, (err, dh) => {
            if (dh) {
                dh.trangthai = 'đã bán';
                let dateStart = new Date();
                dateStart.setHours(0); dateStart.setMinutes(0); dateStart.setSeconds(0); dateStart.setMilliseconds(0)
                let dateEnd = new Date();
                dateEnd.setHours(23); dateEnd.setMinutes(59); dateEnd.setSeconds(59); dateEnd.setMilliseconds(59)
                DoanhSo.findOne({ ngay: { "$gte": dateStart, "$lt": dateEnd } }, (err, ds) => {
                    if (ds === null) {
                        DoanhSo.create({
                            ngay: Date.now(),
                            tien: dh.tongtien
                        })
                    } else {
                        const t = dh.tongtien + ds.tien;
                        ds.tien = t;
                        ds.save();
                    }
                })
                dh.save().then(() => res.json(dh))
            }
        })
    }

    /**Tính tông tièn của đặt hàng */
    tinhTongTienDatHang(req, res) {
        if (req.body.tongtien !== undefined && req.body.id !== undefined && req.body.id !== '') {
            const tongtien = req.body.tongtien;
            DatHang.updateOne({ _id: req.body.id }, { tongtien: tongtien })
                .exec((err, result) => {
                    if (!err) {
                        res.send(result);
                    } else res.send(req.body);
                })
        }
        else {
            if (req.body.khachhang !== undefined) {
                DatHang.updateOne({ khachhang: req.body.khachhang, trangthai: 'giỏ hàng' }, { tongtien: 0 })
                    .exec((err, result) => {
                        if (!err) {
                            res.send(result);
                        } else res.send(req.body);
                    })
            }
            else res.send('Lỗi undefined tongtien');
        }
    }
}

module.exports = new OrderController;