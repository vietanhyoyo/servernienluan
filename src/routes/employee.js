const express = require('express');
const route = express.Router();
const employeeController = require('../app/controllers/EmployeeController')


route.post('/laynhanvienbangid', employeeController.layNhanVienBangID)
route.get('/locnhanvien', employeeController.locNhanVien)
route.post('/xoanhanvien', employeeController.xoaNhanVien)
route.post('/laylaimatkhau', employeeController.laylaimatkhauNhanVien)
route.post('/suathongtinnhanvien', employeeController.suaNhanVien)
route.post('/themnhanvien', employeeController.themNhanVien)
route.get('/danhsachnhanvien', employeeController.danhsachNhanVien)
route.get('/', employeeController.index)

module.exports = route;
