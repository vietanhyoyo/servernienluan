const DatHang = require('../models/DatHang')
const ChiTietDatHang = require('../models/ChiTietDatHang')
const DoanhSo = require('../models/DoanhSo')

class OrderController {

    index(req, res) {
        res.send('Order')
    }

    themDatHang(req, res) {
        const dathang = new DatHang({
            khachhang: '62220877e86f17e5c21810ac',
            trangthai: 'Chưa duyệt'
        })
        dathang.save()
            .then(() => res.json(dathang));
    }

    /**Them chi tiet dat hang */
    themChiTietDatHang(req, res) {
        const chitietdathang = new ChiTietDatHang({
            dathang: '62240bdd502aa751d8c57403',
            sanpham: '622360830078ccaedbd24efd',
            soluong: 2
        });
        chitietdathang.save()
            .then(() => res.json(chitietdathang));
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
}

module.exports = new OrderController;