const GiaSanPham = require('../models/GiaSanPham');
const KhuyenMai = require('../models/KhuyenMai');
const SanPham = require('../models/SanPham');
const DoanhSo = require('../models/DoanhSo');
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;

class PriceController {

    inRa() {
        console.log('In ra');
    }
    /**Cap nhat gia cua san pham */
    async capNhatGiaSanPham(idProduct) {

        const giaSP = await GiaSanPham.findOne({ sanpham: idProduct });
        if (giaSP === null) {
            await GiaSanPham.create({ sanpham: ID(idProduct) })
        }

    }
    /**Cap nhat gia cua san pham */
    async capNhatGiaSanPham(idProduct, price) {

        const giaSP = await GiaSanPham.findOne({ sanpham: idProduct });
        if (giaSP === null) {
            await GiaSanPham.create({ sanpham: ID(idProduct), giaban: price })
        }

    }
    /**Cap nhat gia tri san pham theo khuyen mai */
    async capNhatGiaSanPhamTheoKhuyenMai(idProduct) {

        const sanpham = await SanPham.findById(idProduct).select('_id gianiemyet tensanpham')

        if (sanpham !== null) {

            const khuyenmai = await KhuyenMai.findOne()
                .where('trangthai').equals(1)
                .where('danhsachsanpham').in([idProduct])
                .populate({ path: 'danhsachsanpham', model: 'SanPham', select: 'gianiemyet _id' })
                .sort('-phantram')

            if (khuyenmai !== null) {
                let gia = (100 - khuyenmai.phantram) * 0.01 * sanpham.gianiemyet;
                await GiaSanPham.updateOne({ sanpham: idProduct }, { giaban: gia, khuyenmai: khuyenmai._id })
            }
            else {
                await GiaSanPham.updateOne({ sanpham: idProduct }, { giaban: sanpham.gianiemyet, khuyenmai: null })
            }
        }

    }

    /**Tao doanh so */
    async taoDoanhSoTrongNgay() {
        /**Thiet lap ngay bat dau ket thuc */
        let dateStart = new Date();
        dateStart.setHours(0); dateStart.setMinutes(0); dateStart.setSeconds(0); dateStart.setMilliseconds(0)
        let dateEnd = new Date();
        dateEnd.setHours(23); dateEnd.setMinutes(59); dateEnd.setSeconds(59); dateEnd.setMilliseconds(59)

        /**Tim doanh so */
        let doanhso = await DoanhSo.findOne({ ngay: { "$gte": dateStart, "$lt": dateEnd } })

        if (doanhso === null) {
            /**Tao doanh so */
            await DoanhSo.create({ ngay: Date.now() })
        }

        return doanhso;
    }

    /**Cap nhat khuyen mai trong ngay */
    async capNhatKhuyenMaiTrongNgay() {
        const khuyenmai = await KhuyenMai.find({})
        /**Cap nhat trang thai */
        const data = khuyenmai.map(ele => {
            const result = {
                _id: ele._id,
                tenkhuyenmai: ele.tenkhuyenmai,
                phantram: ele.phantram,
                ngaybd: ele.ngaybd,
                ngaykt: ele.ngaykt,
                danhsachsanpham: ele.danhsachsanpham
            }
            const now = new Date();
            let th = 0;
            if (new Date(ele.ngaybd) <= now && new Date(ele.ngaykt) >= now) th = 1;
            else if (new Date(ele.ngaykt) <= now) th = -1;
            result.trangthai = th;
            return result;
        });
        /**Update */
        for (let i = 0; i < data.length; i++) {
            await KhuyenMai.updateOne({ _id: data[i]._id }, data[i]);
        }
    }
}

module.exports = new PriceController;