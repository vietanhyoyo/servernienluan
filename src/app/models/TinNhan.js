const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TinNhan = new Schema({
    nguoigui: { type: Schema.Types.ObjectId },
    noidung: { type: String, maxlength: 255 },
    nguoinhan: { type: Schema.Types.ObjectId },
    trangthai: { type: String, maxlength: 255 },
    thoigian: { type: Date, default: Date.now },
}, {
    timestamps: true
})

module.exports = mongoose.model('TinNhan', TinNhan, 'tinnhan')