const KhuyenMai = require('../models/KhuyenMai');

class KhuyenMaiController {
    index(req, res) {
        res.send('KhuyenMai')
    }


    /**Them khuyen mai */
    themKhuyenMai(req, res) {
        const khuyenmai = new KhuyenMai({
            tenkhuyenmai: 'Khuyến mãi 8/3',
            ngaybd: '03/06/2022',
            ngaykt: '03/09/2022',
            phantram: 20,
            trangthai: 'Đang diễn ra',
            danhsachsanpham: ['622360830078ccaedbd24efd', '622361673d8cca6948dd92cf'],
        })
        khuyenmai.save()
            .then(() => res.json(khuyenmai))
    }

    /**Xem danh sach khuyen mai */
    async danhsachKhuyenMai(req, res){
        const khuyenmai = await KhuyenMai.find({}).populate({path: 'danhsachsanpham', model: 'SanPham'});
        res.json(khuyenmai)
    }
}

module.exports = new KhuyenMaiController;