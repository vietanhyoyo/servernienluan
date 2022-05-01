const KhuyenMai = require('../models/KhuyenMai');
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const priceController = require('./PriceController');

class KhuyenMaiController {
    index(req, res) {
        res.send('KhuyenMai')
    }

    /**Cap nhat gia cua san pham */
    // async capNhatGiaSanPham(promotion, idProduct) {

    //     const giaSP = await GiaSanPham.findOne({ sanpham: idProduct });
    //     if (giaSP === null) {
    //         await GiaSanPham.create({ sanpham: ID(idProduct) })
    //     }
    // }

    /**Them khuyen mai */
    themKhuyenMai(req, res) {
        const data = req.body.promotion;

        KhuyenMai.create(data)
            .then(res.send(data))
    }

    /**Xem danh sach khuyen mai */
    async danhsachKhuyenMai(req, res) {
        const khuyenmai = await KhuyenMai.find({})
            .populate({ path: 'danhsachsanpham', model: 'SanPham' })
            .sort('-ngaybd');

        res.send(khuyenmai)


    }

    /**Thêm sản phẩm vào khuyến mãi */
    async themSanPhamVaoKhuyenMai(req, res) {
        const promotion = req.body.promotion;
        const idProduct = req.body.idProduct;

        promotion.danhsachsanpham.push(idProduct);

        await KhuyenMai.updateOne({ _id: promotion._id }, promotion)

        await priceController.capNhatGiaSanPham(idProduct);
        await priceController.capNhatGiaSanPhamTheoKhuyenMai(idProduct);
        res.send(promotion);

    }
    /**Xoa khuyen mai */
    async xoaKhuyenMai(req, res) {
        if (req.body.promotion) {
            const promotion = req.body.promotion;

            /**Lay danh sach san pham */
            const sp = promotion.danhsachsanpham;

            await KhuyenMai.deleteOne({ _id: promotion._id })

            for (let i = 0; i < sp.length; i++) {
                await priceController.capNhatGiaSanPhamTheoKhuyenMai(sp[i]);
            }

            res.send('Da xoa khuyen mai');
        }
        else res.send('Loi');
    }
    /**Xóa sản phẩm khuyến mãi */
    async xoaSanPham(req, res) {
        if (req.body.promotion && req.body.idSP) {
            const promotion = req.body.promotion;
            const idSP = req.body.idSP;

            const khuyenmai = await KhuyenMai.findById(promotion._id)

            const arr = khuyenmai.danhsachsanpham;
            const new_arr = arr.filter(item => {
                return item.toString() != idSP;
            });

            promotion.danhsachsanpham = new_arr;
            await KhuyenMai.updateOne({ _id: promotion._id }, promotion)
            await priceController.capNhatGiaSanPhamTheoKhuyenMai(idSP);
            res.send(promotion)
        }
    }
}

module.exports = new KhuyenMaiController;