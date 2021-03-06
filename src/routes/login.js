const express = require('express');
const route = express.Router();
const loginController = require('../app/controllers/LoginController');

route.post('/layuser', loginController.layuserDangNhap);
route.post('/dangnhap', loginController.dangnhap);
route.get('/', loginController.index);

module.exports = route;