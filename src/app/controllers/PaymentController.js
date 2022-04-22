const DatHang = require("../models/DatHang");

class PaymentController {

    index(req, res) {
        res.send('Payment')
    }

    /**Tạo một thanh toán qua paypal */
    dathang(req, res) {
        if (req.body.dathang !== undefined) {
            const dathang = req.body.dathang;
            /**Chuyển sang tiền đô */
            let usd = dathang.tongtien * 0.000044;
            dathang.usd = Math.round(usd * 100) / 100;

            DatHang.updateOne({ _id: dathang._id }, { trangthai: 'chờ duyệt' })
                .then(result => res.send(result));
        }
        else res.send('Không có dữ liệu để thanh toán!');
    }
    /**Tạo một thanh toán qua paypal */
    thanhtoan(req, res) {
        if (req.body.dathang !== undefined) {
            const dathang = req.body.dathang;
            /**Chuyển sang tiền đô */
            let usd = dathang.tongtien * 0.000044;
            dathang.usd = Math.round(usd * 100) / 100;

            DatHang.updateOne({ _id: dathang._id }, { trangthai: 'chờ duyệt', dathanhtoan: true })
                .then(result => res.send(result));
        }
        else res.send('Không có dữ liệu để thanh toán!');
    }
}

module.exports = new PaymentController;