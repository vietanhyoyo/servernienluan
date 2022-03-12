const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TinhThanhPho = new Schema({
    ten: { type: String, unique: true, require: true }
})

module.exports = mongoose.model('TinhThanhPho', TinhThanhPho, 'tinhthanhpho')