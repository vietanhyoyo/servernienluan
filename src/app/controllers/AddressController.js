
const TinhThanhPho = require('../models/TinhThanhPho')
const QuanHuyen = require('../models/QuanHuyen')
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;

class AddressController{
    
    index(req, res) {
        res.send('Address')
    }
    async danhsachTinh(req,res) {
        const tinh = await TinhThanhPho.find({});
        res.json(tinh);
    }

    async danhsachQuanHuyen(req,res) {
        const quanhuyen = await QuanHuyen.find()   
            res.send(quanhuyen);   
    }

    themTinhTP(req, res) {
        const TinhTP = new TinhThanhPho({
                ten: 'Đồng Tháp' ,    
            });
        TinhTP.save()
            .then( () => console.log('Tao model thanh cong'));
    }

    /**'/address/themquanhuyen' */
    themQuanHuyen(req, res) {
        const quanhuyen = new QuanHuyen({
                ten: 'thành phố Cao Lãnh' , 
                tinhtp: ID('6262b1b42cd324dd3061acfc')
            });
        quanhuyen.save()
            .then( () => console.log('Tao model thanh cong'))
            .then( () => res.json(quanhuyen) );
    }
    /** */
}

module.exports = new AddressController;