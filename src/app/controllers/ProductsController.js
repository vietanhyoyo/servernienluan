const SanPham = require('../models/SanPham');
const LoaiHang = require('../models/LoaiHang');
const LoaiSanPham = require('../models/LoaiSanPham');
const GiaSanPham = require('../models/GiaSanPham');
const priceController = require('./PriceController');
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;

class ProductsController {
    index(req, res) {
        res.send('Products')
    }

    show(req, res) {
        res.send('PRODUCT')
    }

    /**Hien thi san pham theo id*/
    async hienthiSanPham(req, res) {
        const sanpham = await SanPham.findById(req.body._id).populate({ path: 'loaisanpham', model: 'LoaiSanPham'});
        res.send(sanpham);
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

    /*Tìm các sản phẩm theo loại sản phẩm theo id */
    async traveSanPhamtheoIDLoaiSanPham(req, res) {
        const idloaisanpham = req.body.id;
        const sanpham = await SanPham.find({ loaisanpham: idloaisanpham })
            .select('_id tensanpham hinhanh gianiemyet donvitinh');
        const data = [];
        for (let i = 0; i < sanpham.length; i++) {
            const giasanpham = await GiaSanPham.findOne({ sanpham: sanpham[i]._id })
                .populate({ path: 'khuyenmai', model: 'KhuyenMai', select: 'phantram' })
                .select('_id giaban khuyenmai')

            const newEle = {
                _id: sanpham[i]._id,
                tensanpham: sanpham[i].tensanpham,
                hinhanh: sanpham[i].hinhanh,
                gianiemyet: sanpham[i].gianiemyet,
                donvitinh: sanpham[i].donvitinh,
                giasanpham: giasanpham
            }
            data.push(newEle);
        }
        res.send(data);
    }

    /*Tìm loại sản phẩm theo id */
    traveLoaiSanPhamID(req, res, next) {
        LoaiSanPham.findById(req.body.id)
            .then(data => res.send(data))
            .catch(next);
    }

    /*Tìm kiếm tên sản phẩm */
    timtenSanPham(req, res, next) {
        const data = req.body.id;
        SanPham.find({ 'tensanpham': new RegExp(data, 'i') })
            .then(data => res.send(data))
            .catch(next);
    }

    // layHinhAnh(req, res) {
    //     const filepath = '~/public/productimages/bboy.png';
    //     res.sendFile(filepath);
    // }
    /**Them san pham */
    themSanPham(req, res) {
        const dataproduct = req.body.product;

        /*Sử lý hình ảnh thêm localhost:5001/id= vào địa chỉ hình 
        ảnh để có thể truy cập được hình ảnh từ http */
        let imgs = [];
        if (dataproduct.hinhanh !== undefined && dataproduct.hinhanh !== []) {
            const ha = dataproduct.hinhanh;
            imgs = ha.map((ele) => {
                return 'http://localhost:5001/?id=' + ele;
            })
            dataproduct.hinhanh = imgs;
        }

        /*Lưu sản phẩm */
        const sanpham = new SanPham(dataproduct);
        sanpham.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                priceController.capNhatGiaSanPham(result._id, result.gianiemyet);
                res.send(result)
            }
        })

    }

    /**Them hinh anh san pham */
    themSanPhamHinhAnh(req, res, next) {
        res.send(req.files);
    }

    /**Lấy hình ảnh */
    // layHinhAnh(req, res) {
    //     const idhinhanh = req.query.id;
    //     const img = require(`../../../public/productimages/${idhinhanh}`);
    //     res.send(img);
    // }

}

module.exports = new ProductsController;
