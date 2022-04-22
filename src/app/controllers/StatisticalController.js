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
        const DoanhThu = new DoanhSo({
            ngay: '2022-04-21',
            tien: 880000,
            sosanphamdaban: 250
        })
        await DoanhThu.save();
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