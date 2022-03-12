const express = require('express');
const route = express.Router();
const employeeController = require('../app/controllers/EmployeeController')


route.get('/themnhanvien', employeeController.themNhanVien)
route.get('/', employeeController.index)

module.exports = route;

