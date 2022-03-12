const TinNhan = require('../models/TinNhan')
const Mongoose = require('mongoose');
const ID = Mongoose.Types.ObjectId;

class MessageController{
    
    index(req, res) {
        res.send('MESSAGE');
    }

    themTinNhan(req, res){
        const tinnhan = new TinNhan({
            nguoigui: '6222074677fda53eaa054761',
            noidung: 'Chào admin',
            trangthai: 'chưa đọc'
        })
        tinnhan.save()
            .then(() => res.json(tinnhan));
    }
     
}

module.exports = new MessageController;