const DatHang = require('../models/DatHang')
const ChiTietDatHang = require('../models/ChiTietDatHang')
const DoanhSo = require('../models/DoanhSo')
const GiaSanPham = require('../models/GiaSanPham')
const SanPham = require('../models/SanPham')
const QuanHuyen = require('../models/QuanHuyen')

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
        else {

            const chitietdathang = await ChiTietDatHang.find({ dathang: order._id })
                .populate({ path: 'sanpham', model: 'SanPham', select: '_id hinhanh tensanpham gianiemyet donvitinh' })
            let result = [];

            for (let i = 0; i < chitietdathang.length; i++) {

                const giasanpham = await GiaSanPham.findOne({ sanpham: chitietdathang[i].sanpham._id }).select('giaban');

                let element = {
                    _id: chitietdathang[i]._id,
                    gia: chitietdathang[i].gia,
                    dathang: chitietdathang[i].dathang,
                    sanpham: chitietdathang[i].sanpham,
                    soluong: chitietdathang[i].soluong,
                    giasanpham: giasanpham.giaban
                };


                result.push(element);
            }

            res.send(result);
        }

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
                soluong: req.body.soluong,
                gia: req.body.gia
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
                soluong: req.body.soluong,
                gia: req.body.gia
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

    /**layDonHangCanDuyet */
    async layDonHangCanDuyet(req, res) {
        const dathang = await DatHang.find({ trangthai: 'chờ duyệt' })
            .populate({ path: 'khachhang', model: 'KhachHang' });
        let data = [];
        for (let i = 0; i < dathang.length; i++) {
            let element = { ...dathang[i] };
            let doc = element._doc;
            if (doc.khachhang.quanhuyen !== undefined) {
                const quanhuyen = await QuanHuyen.findById(doc.khachhang.quanhuyen)
                    .populate({ path: 'tinhtp', model: 'TinhThanhPho' });
                doc.khachhang.quanhuyen = quanhuyen;
            }
            data.push(doc);
        }
        res.send(data);
    }

    /**Lấy chi tiết đặt hàng của một đơn hàng */
    async layCacChiTietDatHang(req, res) {
        if (req.body.id !== undefined) {
            const chitietdathang = await ChiTietDatHang.find({ dathang: req.body.id })
                .populate({ path: 'sanpham', model: 'SanPham', select: '_id tensanpham hinhanh gianiemyet donvitinh' })
            res.send(chitietdathang);

        } else res.send('Không có dữ liệu')
    }

    /**Xác nhận đặt hàng */
    async xacNhanDatHang(req, res) {
        if (req.body.id !== undefined) {
            const dathang = req.body.id;
            /**Lấy doanh số trong ngày */
            const doanhso = await DoanhSo.findOne({}, {}, { sort: { 'ngay': -1 } })
            const chitietdathang = await ChiTietDatHang.find({ dathang: dathang })
                .populate({ path: 'sanpham', model: 'SanPham' });

            let soluongSanPhamBan = 0;
            for (let i = 0; i < chitietdathang.length; i++) {
                soluongSanPhamBan += chitietdathang[i].soluong;
                await SanPham.updateOne({
                    _id: chitietdathang[i].sanpham._id
                },
                    {
                        daban: chitietdathang[i].sanpham.daban + chitietdathang[i].soluong,
                        soluong: chitietdathang[i].sanpham.soluong - chitietdathang[i].soluong
                    })
            }

            DoanhSo.updateOne(
                { _id: doanhso._id },
                {
                    tien: doanhso.tien + req.body.tongtien,
                    sosanphamdaban: doanhso.sosanphamdaban + soluongSanPhamBan
                })
                .then(() => {
                    DatHang.updateOne({ _id: dathang }, { trangthai: 'đã xác nhận' })
                        .then(result => res.send(result));
                }
                )
        }

        else res.send('Không có dữ liệu gửi lên!')
    }

    /**Hủy đơn hàng */
    huyDonHang(req, res) {
        if (req.body.id !== undefined) {
            DatHang.updateOne({ _id: req.body.id }, { trangthai: 'hủy' })
                .then(result => res.send(result));
        } else res.send('Hủy thất bại!')
    }

    /**Xóa giỏ hàng */
    xoaGioHang(req, res) {
        ChiTietDatHang.deleteMany({ dathang: req.body._id })
            .then(result => res.send(result));

    }

    /**Lấy đơn hàng của khách hàng */
    async layDonHangCuaKhachHang(req, res) {
        const id = req.body._id;

        const dathang = await DatHang.find({ khachhang: id })
            .populate({ path: 'khachhang', model: 'KhachHang' })
            .sort('-_id')
            .where({ trangthai: { $ne: 'giỏ hàng' } })

        let data = [];

        /**Kết nối quận huyện */
        for (let i = 0; i < dathang.length; i++) {
            let element = { ...dathang[i] };
            let doc = element._doc;
            if (doc.khachhang.quanhuyen !== undefined) {
                const quanhuyen = await QuanHuyen.findById(doc.khachhang.quanhuyen)
                    .populate({ path: 'tinhtp', model: 'TinhThanhPho' });
                doc.khachhang.quanhuyen = quanhuyen;
            }
            data.push(doc);
        }
        res.send(data);
    }
    capnhatSLChiTietDatHang(req, res) {
        if (req.body._id)
            ChiTietDatHang.updateOne({ _id: req.body._id }, { soluong: req.body.sl, gia: req.body.gia })
                .then(() => res.send('đã cập nhật chi tiết đặt hàng'));
    }
}

module.exports = new OrderController;