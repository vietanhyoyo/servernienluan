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
            ngay: '2022-01-02',
            tien: 46000,
            sosanphamdaban: 140
        })
        const DoanhThu1 = new DoanhSo({
            ngay: '2022-01-03',
            tien: 360000,
            sosanphamdaban: 70
        })
        const DoanhThu2 = new DoanhSo({
            ngay: '2022-01-04',
            tien: 600000,
            sosanphamdaban: 200
        })
        const DoanhThu3 = new DoanhSo({
            ngay: '2022-01-05',
            tien: 470000,
            sosanphamdaban: 140
        })
        const DoanhThu4 = new DoanhSo({
            ngay: '2022-01-06',
            tien: 220000,
            sosanphamdaban: 60
        })
        const DoanhThu5 = new DoanhSo({
            ngay: '2022-01-07',
            tien: 570000,
            sosanphamdaban: 100
        })
        const DoanhThu6 = new DoanhSo({
            ngay: '2022-01-08',
            tien: 890222,
            sosanphamdaban: 120
        })
        const DoanhThu7 = new DoanhSo({
            ngay: '2022-01-09',
            tien: 240000,
            sosanphamdaban: 200
        })
        const DoanhThu8 = new DoanhSo({
            ngay: '2022-01-10',
            tien: 390000,
            sosanphamdaban: 120
        })
        const DoanhThu9 = new DoanhSo({
            ngay: '2022-01-11',
            tien: 170000,
            sosanphamdaban: 30
        })
        const DoanhThu10 = new DoanhSo({
            ngay: '2022-01-12',
            tien: 470000,
            sosanphamdaban: 140
        })
        const DoanhThu11 = new DoanhSo({
            ngay: '2022-01-13',
            tien: 145000,
            sosanphamdaban: 50
        })
        const DoanhThu12 = new DoanhSo({
            ngay: '2022-01-14',
            tien: 450000,
            sosanphamdaban: 80
        })
        const DoanhThu13 = new DoanhSo({
            ngay: '2022-01-15',
            tien: 654222,
            sosanphamdaban: 77
        })
        const DoanhThu14 = new DoanhSo({
            ngay: '2022-01-16',
            tien: 520000,
            sosanphamdaban: 120
        })
        const DoanhThu15 = new DoanhSo({
            ngay: '2022-01-17',
            tien: 360000,
            sosanphamdaban: 60
        })
        const DoanhThu16 = new DoanhSo({
            ngay: '2022-01-18',
            tien: 360000,
            sosanphamdaban: 150
        })
        const DoanhThu17 = new DoanhSo({
            ngay: '2022-01-19',
            tien: 470000,
            sosanphamdaban: 140
        })
        const DoanhThu18 = new DoanhSo({
            ngay: '2022-01-20',
            tien: 145000,
            sosanphamdaban: 50
        })
        const DoanhThu19 = new DoanhSo({
            ngay: '2022-01-21',
            tien: 450000,
            sosanphamdaban: 80
        })
        const DoanhThu20 = new DoanhSo({
            ngay: '2022-01-22',
            tien: 654222,
            sosanphamdaban: 77
        })
        const DoanhThu21 = new DoanhSo({
            ngay: '2022-01-23',
            tien: 520000,
            sosanphamdaban: 120
        })
        const DoanhThu22 = new DoanhSo({
            ngay: '2022-01-24',
            tien: 360000,
            sosanphamdaban: 60
        })
        const DoanhThu23 = new DoanhSo({
            ngay: '2022-01-25',
            tien: 360000,
            sosanphamdaban: 150
        })
        const DoanhThu24 = new DoanhSo({
            ngay: '2022-01-26',
            tien: 470000,
            sosanphamdaban: 140
        })
        const DoanhThu25 = new DoanhSo({
            ngay: '2022-01-27',
            tien: 145000,
            sosanphamdaban: 50
        })
        const DoanhThu26 = new DoanhSo({
            ngay: '2022-01-28',
            tien: 450000,
            sosanphamdaban: 80
        })
        const DoanhThu27 = new DoanhSo({
            ngay: '2022-02-28',
            tien: 654222,
            sosanphamdaban: 77
        })
        const DoanhThu28 = new DoanhSo({
            ngay: '2022-01-29',
            tien: 520000,
            sosanphamdaban: 120
        })
        const DoanhThu29 = new DoanhSo({
            ngay: '2022-01-30',
            tien: 360000,
            sosanphamdaban: 60
        })
        const DoanhThu30 = new DoanhSo({
            ngay: '2022-01-31',
            tien: 360000,
            sosanphamdaban: 150
        })
        
        await DoanhThu.save();
        await DoanhThu1.save();
        await DoanhThu2.save();
        await DoanhThu3.save();
        await DoanhThu4.save();
        await DoanhThu5.save();
        await DoanhThu6.save();
        await DoanhThu7.save();
        await DoanhThu8.save();
        await DoanhThu9.save();
        await DoanhThu10.save();
        await DoanhThu11.save();
        await DoanhThu12.save();
        await DoanhThu13.save();
        await DoanhThu14.save();
        await DoanhThu15.save();
        await DoanhThu16.save();
        await DoanhThu17.save();
        await DoanhThu18.save();
        await DoanhThu19.save();
        await DoanhThu20.save();
        await DoanhThu21.save();
        await DoanhThu22.save();
        await DoanhThu23.save();
        await DoanhThu24.save();
        await DoanhThu25.save();
        await DoanhThu26.save();
        await DoanhThu27.save();
        await DoanhThu28.save();
        await DoanhThu29.save();
        await DoanhThu30.save();
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