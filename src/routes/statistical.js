const express = require('express');
const route = express.Router();
const statistical = require('../app/controllers/StatisticalController')


route.get('/themdoanhthu', statistical.themdoanhthu)
route.get('/danhsachdoanhso', statistical.dsdoanhso)
route.get('/', statistical.index)




module.exports = route;
    