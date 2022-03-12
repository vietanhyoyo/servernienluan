const express = require('express')
const route = express.Router();

const commentController = require('../app/controllers/CommentController')


route.get('/danhsachbinhluan', commentController.danhsachBinhLuan)
route.get('/themtraloi', commentController.themTraLoi)
route.get('/thembinhluan', commentController.themBinhLuan)
route.get('/', commentController.index)

module.exports = route