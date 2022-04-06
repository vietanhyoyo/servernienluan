const express = require('express');
const route = express.Router();
const employeeController = require('../app/controllers/EmployeeController')


route.post('/themnhanvien', employeeController.themNhanVien)
route.get('/danhsachnhanvien', employeeController.danhsachNhanVien)
route.get('/', employeeController.index)

module.exports = route;

