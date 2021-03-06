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
        const sanpham = await SanPham.findById(req.body._id).populate({ path: 'loaisanpham', model: 'LoaiSanPham' });

        const giasanpham = await GiaSanPham.findOne({ sanpham: sanpham._id })
            .populate({ path: 'khuyenmai', model: 'KhuyenMai' })
            .select('_id giaban khuyenmai')

        const newEle = {
            _id: sanpham._id,
            tensanpham: sanpham.tensanpham,
            mota: sanpham.mota,
            hinhanh: sanpham.hinhanh,
            loaisanpham: sanpham.loaisanpham,
            gianiemyet: sanpham.gianiemyet,
            trangthai: sanpham.trangthai,
            soluong: sanpham.soluong,
            donvitinh: sanpham.donvitinh,
            nhacungcap: sanpham.nhacungcap,
            sanphamcungloai: sanpham.sanphamcungloai,
            daban: sanpham.daban,
            giasanpham: giasanpham
        }

        res.send(newEle);
    }

    /**Hien danh sach san pham trong csdl */
    async danhsachSanPham(req, res) {
        const sanpham = await SanPham.find({}).populate({ path: 'loaisanpham', model: 'LoaiSanPham' });
        res.send(sanpham)
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

    /**L???y don vi tinh */
    layDonViTinh(req, res) {
        SanPham.findById(req.body.id).select('_id donvitinh').exec((err, result) => {
            if (!err) {
                res.send(result);
            }
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
                    res.send('???? up l??n')
                })
        }
    }
    /**X??a loaihang v???i id t??? require */
    xoaLoaiHangID(req, res) {
        LoaiHang.deleteOne({ _id: req.body._id })
            .then(() => res.send('???? x??a lo???i h??ng'));
    }
    /**S???a ????i t??n lo???i h??ng */
    suaLoaiHangID(req, res, next) {
        LoaiHang.updateOne({ _id: req.body._id }, req.body)
            .then(() => res.send('???? s???a lo???i h??ng!'))
            .catch(next)
    }

    /**Hien thi loai san pham co kem theo loai hang */
    async hienthiLoaiSanPham(req, res) {
        const loaisanpham = await LoaiSanPham.find({}).populate({ path: 'loaihang', model: 'LoaiHang' });
        res.send(loaisanpham);
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
    /**X??a lo???i s???n ph???m */
    xoaLoaiSanPhamID(req, res) {
        LoaiSanPham.deleteOne({ _id: req.body._id })
            .then(() => res.send('???? x??a lo???i s???n ph???m'));
    }

    /**S???a ????i t??n lo???i s???n ph???m */
    suaLoaiSanPhamID(req, res, next) {
        LoaiSanPham.updateOne({ _id: req.body._id }, req.body)
            .then(() => res.send('???? s???a lo???i sp!'))
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

    /**T??m lo???i s???n ph???m b???i id c???a lo???i h??ng*/
    timIdLoaiHangsangLoaiSanPham(req, res) {
        LoaiSanPham.find({ loaihang: req.query.id }, (err, lsp) => {
            if (err) console.log(err + ' ???? c?? l???i ');
            else {
                lsp = lsp.map((c => c.toObject()));
                res.send(lsp);
            }
        })
    }

    /**Tr??? v??? danh s??ch lo???i h??ng h??a k??m theo lo???i s???n ph???m */
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

    /*T??m c??c s???n ph???m theo lo???i s???n ph???m theo id */
    async traveSanPhamtheoIDLoaiSanPham(req, res) {
        const idloaisanpham = req.body.id;
        const sanpham = await SanPham.find({ loaisanpham: idloaisanpham, trangthai: { $nin: '???n' } })
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

    /*T??m lo???i s???n ph???m theo id */
    traveLoaiSanPhamID(req, res, next) {
        LoaiSanPham.findById(req.body.id)
            .then(data => res.send(data))
            .catch(next);
    }

    /*T??m ki???m t??n s???n ph???m */
    async timtenSanPham(req, res) {
        const da = req.body.id;
        const sanpham = await SanPham.find({ 'tensanpham': new RegExp(da, 'i'), trangthai: { $nin: '???n' } })
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

    /**T??m s???n ph???m m?? c?? khuy???n m??i */
    async timSanPhamKhuyenMai(req, res) {

        const sanpham = await SanPham.find({ trangthai: { $nin: '???n' } })
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
            if (giasanpham.khuyenmai !== null)
                data.push(newEle);
        }
        res.send(data);
    }

    // layHinhAnh(req, res) {
    //     const filepath = '~/public/productimages/bboy.png';
    //     res.sendFile(filepath);
    // }
    /**Them san pham */
    async themSanPham(req, res) {
        const dataproduct = req.body.product;

        /*S??? l?? h??nh ???nh th??m localhost:5001/id= v??o ?????a ch??? h??nh 
        ???nh ????? c?? th??? truy c???p ???????c h??nh ???nh t??? http */
        let imgs = [];
        if (dataproduct.hinhanh !== undefined && dataproduct.hinhanh !== []) {
            const ha = dataproduct.hinhanh;
            imgs = ha.map((ele) => {
                return 'http://localhost:5001/?id=' + ele;
            })
            dataproduct.hinhanh = imgs;
        }

        /*L??u s???n ph???m */
        const sanpham = await SanPham.create(dataproduct);

        const arr = [sanpham._id];
        await priceController.capNhatGiaSanPham(sanpham._id, sanpham.gianiemyet);
        await SanPham.updateOne({ _id: sanpham._id }, { sanphamcungloai: arr });
        res.send(sanpham)

    }

    /**Them hinh anh san pham */
    themSanPhamHinhAnh(req, res, next) {
        res.send(req.files);
    }

    /** '/timsanphamtheoid' l???y th??ng tin s???n ph???m th??ng qua id */
    async timSanPhamTheoID(req, res) {
        const sanpham = await SanPham.findById(req.body._id);
        res.send(sanpham);
    }

    /**S???a doi san pham */
    suaSanPham(req, res) {
        const product = req.body.product;
        SanPham.updateOne({ _id: product._id }, product)
            .then(() => {
                priceController.capNhatGiaSanPhamTheoKhuyenMai(product._id);
                res.send(product)
            })
    }

    /**Th??m s???n ph???m c??ng */
    async themSanPhamCungLoai(req, res) {
        const product = req.body.product;

        const sanphamMain = await SanPham.findById(req.body.idProduct)
            .select('_id tensanpham sanphamcungloai');

        /**Th??m san ph???m m???i*/
        const newProduct = await SanPham.create(product);
        await priceController.capNhatGiaSanPham(newProduct._id, newProduct.gianiemyet);

        const spcungloai = [...sanphamMain.sanphamcungloai, newProduct._id];

        for (let i = 0; i < spcungloai.length; i++) {
            await SanPham.updateOne({ _id: spcungloai[i] }, { sanphamcungloai: spcungloai });
        }

        res.send(newProduct);
    }
    /**L???y s???n ph???m c??ng lo???i th??ng lon l???c k???t chai */
    async laySanPhamCungLoai(req, res) {
        const sanpham = await SanPham.findById(req.body._id).select('_id tensanpham donvitinh hinhanh gianiemyet');
        res.send(sanpham);
    }

    /**X??a s???n ph???m c??ng lo???i */
    async xoaSanPhamCungLoai(req, res) {
        const id = req.body.id;

        if (id === undefined) res.send('C?? l???i');

        const deleteProduct = await SanPham.findById(id);
        const oldTypeList = deleteProduct.sanphamcungloai;
        const newTypeList = oldTypeList.filter(ele => {
            return ele.toString() !== id;
        })

        await SanPham.updateMany({ sanphamcungloai: oldTypeList }, { sanphamcungloai: newTypeList })
        await GiaSanPham.deleteOne({ sanpham: id })
        await SanPham.deleteOne({ _id: id })
        res.send(newTypeList);

    }

    /**Xoa san pham khi nhan ???????c id c???a san ph???m ????*/
    async xoaSanPham(req, res) {
        const id = req.body.id;

        const sanpham = await SanPham.findById(id);
        const list = sanpham.sanphamcungloai;

        for (let i = list.length - 1; i >= 0; i--) {
            await GiaSanPham.deleteOne({ sanpham: list[i] });
            await SanPham.deleteOne({ _id: list[i] });
        }

        res.send('x??a s???n ph???m th??nh c??ng!');
    }

}

module.exports = new ProductsController;
