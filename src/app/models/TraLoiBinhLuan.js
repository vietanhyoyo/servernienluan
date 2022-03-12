const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TraLoiBinhLuan = new Schema({
    noidung: { type: String, maxlength: 255 },
    hinhanh: { type: String, maxlength: 255 },
    tacgia: { type: Schema.Types.ObjectId },
    luocthich: { type: Number, default: 0 },
    traloi: [{ type: Schema.Types.ObjectId, ref: 'TraLoiBinhLuan' }],
    ngay: { type: Date, default: Date.now },
}, {
    timestamps: true
})

module.exports = mongoose.model('TraLoiBinhLuan', TraLoiBinhLuan, 'traloibinhluan')