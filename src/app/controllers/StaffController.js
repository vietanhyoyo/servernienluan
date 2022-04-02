
const Staff = require('../models/NhanVien');


class StaffController{


    index(req, res) {
        res.send('Staff')
    }


}

module.exports = new StaffController;