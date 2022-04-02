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
            tensanpham: 'Dưa lưới Đế Vương ruột xanh Queen size',
            mota: `<h3>Thông tin sản phẩm</h3>
            <p>Trong quả dưa lưới chứa nhiều loại vitamin A, C, E và axit folic, độ ngọt cao, đem lại nhiều tác dụng cho cơ thể.</p>
            <ul>
            <li>Tăng cường hệ miễn dịch và phòng chống ung thư.</li>
            <li>Chứa nhiều chất xơ, phòng chống táo bó hiệu quả.</li>
            <li>Cải thiện hô hấp, giảm mệt mỏi, chứa mất ngủ.</li>
            <li>Chứa hàm lượng axit folic cao, tốt cho thai nhi và phụ nữ mang thai.</li>
            <li>Phòng ngừa loãng xương, ổn định huyết áp...</li>
            </ul>
            <h3>Hướng dẫn sử dụng</h3>
            <ul>
            <li>Gọt vỏ, ăn trực tiếp.</li>
            <li>Ngon hơn khi ướp lạnh trước khi ăn.</li>
            </ul>
            <p><strong >Lưu ý:</strong></p>
            <p><strong >- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p>
            <p><strong >- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>`,
            hinhanh: ['https://cdn-vincart.vinid.net/cdn-cgi/image/fit=scale-down,w=1200,quality=75,f=auto/vm/product/1621850347700/8936099692234.jpg',
            'https://fujimart.vn/image/cache/catalog/rau%20cu%20qua/dua%20luoi%20taki-502x502.png'],
            loaisanpham: '6229fa0c668f87e0cdc9bfc4',
            gianiemyet: 59000,
            trangthai: 'Còn bán',
            soluong: 40,
            donvitinh: 'Quả',
            nhacungcap: 'Nhà trồng',
        });
        sanpham.save()
            .then(() => res.json(sanpham));
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
    traveSanPhamtheoIDLoaiSanPham(req, res){
        const idloaisanpham = req.body.id;
        SanPham.find({loaisanpham: idloaisanpham}, (err,sp) => {
            if(!err){
                res.send(sp);
            }
        })
    }

    /*Tìm loại sản phẩm theo id */
    traveLoaiSanPhamID(req, res, next){
        LoaiSanPham.findById(req.body.id)
            .then(data => res.send(data))
            .catch(next);
    }
}

module.exports = new ProductsController;