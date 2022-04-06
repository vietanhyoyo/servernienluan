
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const NhanVien = require('../models/NhanVien')
const bcrypt = require('bcrypt-nodejs')

class EmployeeController{
    index(req, res){
        res.send('NHAN VIEN');
    }

    /**'/employee/themnhanvien' */
     themNhanVien(req, res) {
       if(req.body){
        const a  = req.body
        const nhanvien = new NhanVien({
            hoten : a.hoten,
            sdt : a.sdt,
            matkhau : a.matkhau,
            gioitinh : a.gioitinh,
            ngaysinh : a.ngaysinh,
            diachi : a.diachi,
            chucvu : a.chucvu,
            email : a.email,
            hinhanh : ''
         })
         nhanvien.save()
         .then(() => {
             res.send('Đã up lên')
             res.send(a);
         })
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