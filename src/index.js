const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 5000
const cors = require('cors')

//Dung bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/*********************** */
//Khai bao database voi mongodb va ket noi voi database
const db = require('./config/db')
db.connect()

//Dung morgan de kiem tra su kien tren trinh duyet
app.use(morgan('combined'))

//Dung cors
app.use(cors())

/******************** */
//Khai bao route
const route = require('./routes')
//Dung route
route(app);

/**********Ko còn dùng */
//Khai bao va dung session de tao session
const session = require('express-session');
app.use(session({
    secret: 'llldldl',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }/*Chu ki song 1 ngay */
}))

/******************************/

/************Khai báo paypal */
const paypal = require('paypal-rest-sdk');
/**Cấu hình paypal */
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AaL54LXl9M2BUpwvP9MYYeD46AF4uj3NGYhBWg-q5FCzdJ4TsIlyE0KUp3auPPXf36AJQVxMjdfi4vab',
    'client_secret': 'EKyqlO72BSlNWsVL3234EDD84fgz-7Vp_ZYx5GEZvWSGJ8sbbQvB2MD7CSF3lTwzkUBnAQIGrxcYlHlY'
});


/******************* */
/**Tạo một kênh để chia sẽ hình ảnh lắng nghe ở cổng localhost:5001 */
const url = require('url');
const http = require('http');
const fs = require('fs');
/**Tạo cổng lắng nghe 5001 */
http.createServer(function (req, res) {
    /**Lấy tên file ảnh */
    var params = url.parse(req.url, true).query;
    const filePath = params.id;
    /**Đọc file ảnh và gửi */
    fs.readFile(__dirname + `/productimages/${filePath}`, function (err, data) {
        if (err) res.end(null);
        else
            res.end(data); // Send the file data to the browser.
    });

}).listen(5001, "127.0.0.1");

/******************* */
/**Sử dụng socket.io tạo server socket*/
const server = http.createServer(app);
const { Server } = require('socket.io');
const socket = require('./socket')
socket(new Server(server));

/******************** */
/**Tạo cổng lắng nghe ở port 5000 */
server.listen(port, () => console.log(`App listening at http://localhost:${port}`))