
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const NhanVien = require('../models/NhanVien')
const bcrypt = require('bcrypt-nodejs')

class EmployeeController{
    index(req, res){
        res.send('NHAN VIEN');
    }
    
    async locNhanVien(req,res){
        if(req.query.id === 'all'){
            
        }else{
            NhanVien.find({ chucvu: req.query.id }, (err, nv) => {
                if (err) console.log(err + ' đã có lỗi ');
                else {
                    nv = nv.map((c => c.toObject()));
                    res.send(nv);
                }
            })
        }
        
    }


    // Sửa thông tin n  hân viên
    async suaNhanVien(req, res){
        
        if(req.body){
            const info = req.body
                if (info.hinhanh !== undefined) {  
                    if(info.hinhanh.split('http://localhost:5001/?id=').length-1 === 1){
                        info.hinhanh = info.hinhanh
                    }else{
                        const imgs = 'http://localhost:5001/?id=' + info.hinhanh;
                        info.hinhanh = imgs;
                    }   
                }
                if(info.chucvu ==='Nhân viên'){
                    info.chucvu = 'nhanvien'
                }
                if(info.chucvu ==='Quản trị viên'){
                    info.chucvu = 'admin'
                }
            
            let nhanvien = await NhanVien.findOne({_id: info._id})
            nhanvien.hoten = info.hoten;
            nhanvien.diachi = info.diachi;
            nhanvien.email = info.email;
            nhanvien.ngaysinh = info.ngaysinh;
            nhanvien.hinhanh = info.hinhanh;
            nhanvien.chucvu = info.chucvu;
            nhanvien.gioitinh = info.gioitinh;   
            nhanvien.save();
            res.send(nhanvien);
        }
       
    }

    async xoaNhanVien(req,res){
        if(req.body.id){
           const c = req.body.id 
           await  NhanVien.deleteOne({_id: c})
           res.send('finishdelete');
        }   
    }
    async layNhanVienBangID(req,res){
        if(req.body.id){
            const a = await NhanVien.findById(req.body.id);
            res.send(a);
        }
    }


    async laylaimatkhauNhanVien(req, res){
        if(req.body.id){
            let alo = await NhanVien.findOne({_id: req.body.id})
            const mk = await bcrypt.hashSync('cuahangong7',bcrypt.genSaltSync(5),null);
            alo.matkhau = mk
            await alo.save();
            res.send(alo.matkhau);
        }
     }
    
    
    
    
    /**'/employee/themnhanvien' */
    async  themNhanVien(req, res) {  
        let testemail = true;
        let testsdt =true;
        if(req.body){
        
        let thongbao='Themthanhcong';
        let thongbaoemail ='dacoemail';
        let thongbaosdt ='dacosdt';
        let thongbaoca2 ='cahaiduocsudung'
        const a  = req.body
        if (a.hinhanh !== undefined) {      
           const imgs = 'http://localhost:5001/?id=' + a.hinhanh;
            a.hinhanh = imgs;
        }
        await NhanVien.find({ sdt: a.sdt })
        .then((nv) => {
            if (nv.length !== 0) {   
                testsdt=false
            }
        })
        await NhanVien.find({ email: a.email })
        .then((email) => {
            if (email.length !== 0) {   
                testemail=false
            }
        })
        if(a.chucvu === 'Nhân viên'){
            a.chucvu = 'nhanvien'
        }
        if(a.chucvu ==='Quản trị viên'){
            a.chucvu ='admin'
        }
        const mk = await bcrypt.hashSync(a.matkhau,bcrypt.genSaltSync(5),null);
        if(testemail===true && testsdt===true ){
            const nhanvien = new NhanVien({
                hoten : a.hoten,
                sdt : a.sdt,
                matkhau : mk,
                gioitinh : a.gioitinh,
                ngaysinh : a.ngaysinh,
                diachi : a.diachi,
                chucvu : a.chucvu,
                email : a.email,
                hinhanh : a.hinhanh
             })
             nhanvien.save()
             .then(() => {
                    res.send(thongbao);
             })
        }else{
            if(testemail === false && testsdt===false){
                res.send(thongbaoca2)
            }
            if(testsdt === false && testemail ===true){
                res.send(thongbaosdt)
            }
            if(testemail === false && testsdt===true){
                res.send(thongbaoemail)
            }
        }  
       }   
    }



    danhsachNhanVien(req, res) {
        NhanVien.find({}, function (err, nhanvien) {
            if (!err) {
                nhanvien = nhanvien.map(c => c.toObject());
                res.send(nhanvien);
            } else res.status(400).json({ error: 'ERROR!!!' })
        })
    }

    

}

module.exports = new EmployeeController;