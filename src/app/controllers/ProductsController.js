const SanPham = require('../models/SanPham');
const LoaiHang = require('../models/LoaiHang');
const LoaiSanPham = require('../models/LoaiSanPham');
const GiaSanPham = require('../models/GiaSanPham');
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;

class ProductsController {
    index(req, res) {
        res.send('Products')
    }

    show(req, res) {
        res.send('PRODUCT')
    }

    /**Them san pham */
    themSanPham(req, res) {
        const sanpham = new SanPham({
            tensanpham: 'Cải ngọt',
            mota: `<p><strong >Cải ngọt </strong>là một trong những loại <strong >rau củ </strong>rất quen thuộc đối với người Việt Nam. Với cải ngọt, chúng ta có thể chế biến được rất nhiều món ăn hấp dẫn và giàu dinh dưỡng. Mỗi mớ rau cải ngọt được nuôi trồng và chăm chút rất cẩn thận. Những sản phẩm được bày bán trên gian hàng đều đã trải qua quá trình tuyển chọn kỹ càng. Sản phẩm cũng được bảo quản cẩn thận và chặt chẽ để mang tới cho khách hàng những sản phẩm có chất lượng tốt nhất.</p>
            <p><strong >Lưu ý:</strong></p>
            <p><strong >- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p>
            <p><strong >- Hình sản phẩm chỉ mang tính chất minh họa, hình thực tế bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>`,
            hinhanh: 'https://cdn-crownx.winmart.vn/images/prod/162428528941310053859-KG-Cai-thao-hoa-tien-DL-L1-MT.jpg',
            loaisanpham: '621f07caf7c1e1e143f1cb60',
            giamacdinh: 13000,
            trangthai: 'Còn bán',
            soluong: 12,
            donvitinh: 'kg',
            nhacungcap: 'Vườn xanh',
        });
        sanpham.save()
            .then(() => console.log('them san pham'));
    }

    /**Hien danh sach san pham trong csdl */
    async danhsachSanPham(req, res) {
        const sanpham = await SanPham.find({}).populate({ path: 'loaisanpham', model: 'LoaiSanPham' });
        res.json(sanpham)
    }

    /**Tra ve danh sach loai hang(nhom loai san pham) */
    danhsachLoaiHang(req, res) {
        LoaiHang.find({}, function (err, loaihang) {
            if (!err) {
                loaihang = loaihang.map(c => c.toObject());
                res.send(loaihang);
            } else res.status(400).json({ error: 'ERROR!!!' })
        })
    }
    /**Tra ve danh sach loai san pham */
    danhsachLoaiSanPham(req, res) {
        LoaiSanPham.find({}, function (err, loaisanpham) {
            if (!err) {
                loaisanpham = loaisanpham.map(c => c.toObject());
                res.send(loaisanpham);
            } else res.status(400).json({ error: 'ERROR!!!' })
        })
    }
    /**Them moi 1 loai hang */
    themLoaiHang(req, res) {
        //Them model vao csdl
        if (req.body) {
            const loaihang = new LoaiHang({
                tenloaihang: req.body.tenloaihang
            })
            loaihang.save()
                .then(() => {
                    res.send('Đã up lên')
                })
        }
    }
    /**Xóa loaihang với id từ require */
    xoaLoaiHangID(req, res) {
        LoaiHang.deleteOne({ _id: req.body._id })
            .then(() => res.send('Đã xóa loại hàng'));
    }
    /**Sửa đôi tên loại hàng */
    suaLoaiHangID(req, res, next) {
        LoaiHang.updateOne({ _id: req.body._id }, req.body)
            .then(() => res.send('Đã sửa loại hàng!'))
            .catch(next)
    }

    /**Hien thi loai san pham co kem theo loai hang */
    async hienthiLoaiSanPham(req, res) {
        const loaisanpham = await LoaiSanPham.find({}).populate({ path: 'loaihang', model: 'LoaiHang' });
        res.json(loaisanpham);
    }

    /**Them loai san pham/produsts/themloaisanpham */
    themLoaiSanPham(req, res) {
        if (req.body) {
            const loaisp = new LoaiSanPham({
                tenloaisanpham: req.body.tenloaisanpham,
                loaihang: ID(req.body.loaihang)
            })
            loaisp.save()
                .then(() => {
                    res.send('id: ' + req.body.loaihang)
                })
        }
    }
    /**Xóa loại sản phẩm */
    xoaLoaiSanPhamID(req, res) {
        LoaiSanPham.deleteOne({ _id: req.body._id })
            .then(() => res.send('Đã xóa loại sản phẩm'));
    }

    /**Sửa đôi tên loại sản phẩm */
    suaLoaiSanPhamID(req, res, next) {
        LoaiSanPham.updateOne({ _id: req.body._id }, req.body)
            .then(() => res.send('Đã sửa loại sp!'))
            .catch(next)
    }

    /**Them gia cho san pham sau khi co khuyen mai*/
    themGiaSanPham(req, res) {
        const giasanpham = new GiaSanPham({
            sanpham: '622360830078ccaedbd24efd'
        })
        giasanpham.save()
            .then(() => res.json(giasanpham));
    }

    /**Cap nhat gia san pham */
    async capnhatGiaSanPham(req, res) {
        let giatri = 0;
        const sanpham = await SanPham.findById(req.query.id);
        if (sanpham) giatri = sanpham.giamacdinh;
        const giasanpham = await GiaSanPham.findById(req.query.giasanpham)
        giasanpham.giaban = giatri;
        giasanpham.save()
            .then(() => res.json(giasanpham));
    }

    /**Tìm loại sản phẩm bởi id của loại hàng*/
    timIdLoaiHangsangLoaiSanPham(req, res) {
        LoaiSanPham.find({ loaihang: req.query.id }, (err, lsp) => {
            if (err) console.log(err + ' đã có lỗi ');
            else {
                lsp = lsp.map((c => c.toObject()));
                res.send(lsp);
            }
        })
    }

    /**Trả về danh sách loại hàng hóa kèm theo loại sản phẩm */
    /**Tra ve danh sach loai hang(nhom loai san pham) */
    async danhsachLoaiHangvaLoaiSanPham(req, res) {

        const lsp = await LoaiSanPham.find({});

        LoaiHang.find({})
            .then((loaihang) => {
                const datas = [];
                loaihang.forEach(lh => {
                    let data = {
                        _id: lh._id,
                        tenloaihang: lh.tenloaihang,
                        loaisanpham: lsp.filter(ele => {
                            return ele.loaihang == lh._id.toString();
                        })
                    }
                    datas.push(data);
                })
                res.send(datas);
            })
    }
}

module.exports = new ProductsController;