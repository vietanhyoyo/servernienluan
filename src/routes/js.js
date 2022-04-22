const express = require('express');
const route = express.Router();
const chart2 = require('../app/controllers/j');

route.get('/chart2', chart2.dsdoanhso);
route.get('/', chart2.index);

module.exports = route;