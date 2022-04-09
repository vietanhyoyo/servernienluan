
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const NhanVien = require('../models/NhanVien')
const bcrypt = require('bcrypt-nodejs')

class EmployeeController{
    index(req, res){
        res.send('NHAN VIEN');
    }
    
    // Sửa thông tin n  hân viên
   async suaNhanVien(req, res){
        const sanpham = await SanPham.findById(req.id);
        res.send()
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

        if(testemail===true && testsdt===true ){
            const nhanvien = new NhanVien({
                hoten : a.hoten,
                sdt : a.sdt,
                matkhau : a.matkhau,
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