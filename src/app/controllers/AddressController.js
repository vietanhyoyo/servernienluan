
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
                ten: 'Cần Thơ' ,    
            });
        TinhTP.save()
            .then( () => console.log('Tao model thanh cong'));
    }

    /**'/address/themquanhuyen' */
    themQuanHuyen(req, res) {
        const quanhuyen = new QuanHuyen({
                ten: 'quận Cái Răng' , 
                tinhtp: ID('6221b8337e0ce52dbd718fa7')
            });
        quanhuyen.save()
            .then( () => console.log('Tao model thanh cong'))
            .then( () => res.json(quanhuyen) );
    }
    /** */
}

module.exports = new AddressController;