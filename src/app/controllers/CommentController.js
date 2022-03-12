const BinhLuan = require('../models/BinhLuan')
const Mongoose = require('mongoose');
const TraLoiBinhLuan = require('../models/TraLoiBinhLuan');
const KhachHang = require('../models/KhachHang');
const NhanVien = require('../models/NhanVien')
const ID = Mongoose.Types.ObjectId;

class CommentController {
    index(req, res) {
        res.send('Comment')
    }

    /**'/comment/thembinhluan' */
    themBinhLuan(req, res) {
        const bl = new BinhLuan({
            noidung: 'Kẹo cung ngon :))',
            tacgia: ID('6222ccea9692c1f9d8d67085'),
        });
        bl.save()
            .then(() => console.log('Tao model thanh cong'));
    }

    /**'/comment/themtraloi' */
    themTraLoi(req, res) {
        const tl = new TraLoiBinhLuan({
            noidung: 'đúng vậy sản phẩm tốt lắm',
            tacgia: '6222ccea9692c1f9d8d67085',
        });
        tl.save()
            .then(() => console.log('Tao model thanh cong'));
        BinhLuan.findOne({ _id: '62221416f29da8f7e97f6154' }, (err, bl) => {
            if (err) return handleError(err);
            if (bl) {
                bl.traloi.push(tl)
                bl.save();
                res.json(bl);
            }
        })
    }

    /**'/comment/danhsachbinhluan' */
    async danhsachBinhLuan(req, res) {
        const bl = await BinhLuan.find({}).populate({ path: 'traloi', model: 'TraLoiBinhLuan' });

        const arr = bl.map((element) => {
            let tentacgia;
            NhanVien.findById(element.tacgia, 'hoten',(err, kh) => {
                if (kh) {
                    tentacgia = kh.hoten;
                    console.log(kh);
                }
            })
            element.tentacgia = tentacgia;
            return element;
        })

        res.json(arr);
    }

}

module.exports = new CommentController;