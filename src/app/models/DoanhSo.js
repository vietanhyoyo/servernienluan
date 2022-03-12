const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DoanhSo = new Schema({
    ngay: { type: Date, default: Date.now, unique: true },
    tien: { type: Number, default: 0 },
    sosanphamdaban: { type: Number, default: 0 }
}, {
    timestamps: true
})

module.exports = mongoose.model('DoanhSo', DoanhSo, 'doanhso');