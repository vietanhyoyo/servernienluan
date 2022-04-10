const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-nodejs');
const DanhGia = require('../models/DanhGia');
const KhachHang = require('../models/KhachHang');
const NhanVien = require('../models/NhanVien');

class EvaluateController {
    index(req, res) {
        res.send('Đánh giá');
    }

    /**'/evaluate/themdanhgia' */
    themDanhGiaTest(req, res) {
        const danhgia = new DanhGia({
            sanpham: '62491bed48728bf34cdc86e9',
            noidung: 'Tuyệt vời',
            tacgia: '622efe3359050ca85dfe6d68',
            diemdanhgia: 3
        })
        danhgia.save()
            .then(() => res.json(danhgia));
    }

    /**them danh gia sản pham cua khach hang */
    themDanhGia(req, res) {
        if (!req.body) res.send('Lỗi');

        const danhgia = new DanhGia({
            sanpham: req.body.idProduct,
            noidung: req.body.text,
            tacgia: req.body.idUser,
            diemdanhgia: req.body.value
        })
        danhgia.save()
            .then(() => res.send(danhgia));
    }

    /**Lay danh gia boi id san pham */
    layDanhGia(req, res) {
        DanhGia.find({ sanpham: req.body.id })
            .select('_id diemdanhgia')
            .exec((err, result) => {
                if (!err) {
                    res.send(result);
                }
            })
    }

    async danhsachDanhGia(req, res) {
        const danhgia = await DanhGia.find({ sanpham: req.body.id })
        const data = [];

        const layTacGia = async id => {
            let result = await KhachHang.findById(id).select('_id hoten');
            if (result === null) {
                result = await NhanVien.findById(id).select('_id hoten');
            }
            return result;
        }

        for (let i = 0; i < danhgia.length; i++) {
            const element = {
                _id: danhgia._id,
                sanpham: danhgia[i].sanpham,
                noidung: danhgia[i].noidung,
                tacgia: await layTacGia(danhgia[i].tacgia),
                luocthich: danhgia[i].luocthich,
                diemdanhgia: danhgia[i].diemdanhgia,
                ngay: danhgia[i].ngay,
            }

            if (element.tacgia !== null)
                data.push(element);

        }

        res.send(data);
    }
}

module.exports = new EvaluateController;