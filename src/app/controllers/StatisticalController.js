const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;
const DoanhSo = require('../models/DoanhSo');

class StatisticalController {

    index(req,res){
        res.send('Doanh So')
    }

    async dsdoanhso(req,res){
        DoanhSo.find({}, function (err, doanhso) {
            console.log(doanhso)
            if (!err) {
                doanhso = doanhso.map(c => c.toObject());
                res.send(doanhso);
            } else res.status(400).json({ error: 'ERROR!!!' })
        })
    }

    async themdoanhthu(req,res){
        
        res.send('Thêm thành công')
    }
    async doanhthuTheoThang(req,res){
       
        if(req.body.id){
            const a = req.body.id
            console.log(a)
            res.send(a);           
        }else{
            res.send('đéo được');
        }
       
    }

}

module.exports = new StatisticalController;