const { send } = require('express/lib/response');
const Mongoose = require('mongoose')
const ID = Mongoose.Types.ObjectId;
const SanPham = require('../models/SanPham');
const LoaiSanPham = require('../models/LoaiSanPham');
const LoaiHang = require('../models/LoaiHang')

class SiteController {
    index(req, res) {
        res.send('HOME')
    }

    showSanpham(req, res) {
        SanPham.find({}, function (err, sanpham) {
            if (!err) {
                sanpham = sanpham.map(c => c.toObject());
                console.log(sanpham);
                res.send(sanpham);
            } else res.status(400).json({ error: 'ERROR!!!' })
        })
    }

    themLoaiSanPham(req, res) {
        const query = LoaiSanPham.where({ ten: 'Rau củ quả' });
        query.findOne(function (err, loaisanpham) {
            if (err) return handleError(err);
            if (loaisanpham) {
                loaisanpham.loaihang = LoaiHang.findOne(
                    { tenloaihang: "Rau, củ, trái cây" },
                    function (er, obj) {
                        if (er) res.status(400).json({ error: 'ERROR!!!' });
                        else console.log(obj);
                        loaisanpham.loaihang = ID(obj._id);
                        loaisanpham.save();
                    }
                )
                res.json(loaisanpham);
            }
        });
    }
    async hienthiLoaiSanPham(req, res) {
        const loaisanpham = await LoaiSanPham.find({}).populate({path:'loaihang',model:'LoaiHang'});
        res.json(loaisanpham);
    }
}

module.exports = new SiteController;