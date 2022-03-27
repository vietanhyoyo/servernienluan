const TinNhan = require('../models/TinNhan')
const KhachHang = require('../models/KhachHang')
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;

class MessageController {

    index(req, res) {
        res.send('MESSAGE');
    }

    themTinNhan(req, res) {
        const tinnhan = new TinNhan({
            nguoigui: '6222074677fda53eaa054761',
            noidung: 'Chào admin',
            trangthai: 'chưa đọc'
        })
        tinnhan.save()
            .then(() => res.json(tinnhan));
    }
    /**Khach hàng chat thì sẽ thêm tin nhắn */
    themTinNhanKhachHang(req, res) {
        const data = req.body;
        TinNhan.create(data)
            .then(() => { res.send(data) })
    }
    /**Lấy danh sách khách hàng nhắn tin */
    async laydsKhachHang(req, res) {
        // TinNhan.find({}, 'nguoigui', (err, doc) => {
        //     if(!err){
        //         res.send(doc);
        //     }
        // });
        const idusers = await TinNhan.distinct('nguoigui');
        const kh = await KhachHang.where('_id').in(idusers);
        const data = [];
        data.length = kh.length;
        for (let i = 0; i < kh.length; i++) {
            data[i] = {
                _id: kh[i]._id,
                hoten: kh[i].hoten,
                hinhanh: kh[i].hinhanh,
                tinnhan: await TinNhan.findOne({ nguoigui: kh[i]._id }).sort('-thoigian')  // give me the max
            }
        }
        res.send(data);
    }
    /**Lấy tin nhắn của khách hàng hiển thị vào form chat */
    layTinNhanKhachHang(req, res) {
        const idKhachHang = req.body._id;
        TinNhan.find({ $or: [{ nguoigui: idKhachHang }, { nguoinhan: idKhachHang }] }, (err, doc) => {
            if (!err) {
                res.send(doc);
            }
        })
    }
    /**Thêm tin nhắn từ admin đến khách hàng */
    themTinNhanDenKhachHang(req, res) {
        const data = req.body;
        TinNhan.create(data)
            .then(() => res.send(data))
    }
}

module.exports = new MessageController;