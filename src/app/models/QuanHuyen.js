const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuanHuyen = new Schema({
    ten: { type: String, unique: true, require: true },
    tinhtp: { type: Schema.Types.ObjectId, ref: 'TinhThanhPho' }
},{
    timestamps: true
})

module.exports = mongoose.model('QuanHuyen', QuanHuyen, 'quanhuyen')