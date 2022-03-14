const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 5000
const cors = require('cors')

//Dung bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Khai bao database voi mongodb va ket noi voi database
const db = require('./config/db')
db.connect()

//Dung morgan de kiem tra su kien tren trinh duyet
app.use(morgan('combined'))

//Dung cors
app.use(cors())

//Khai bao route
const route = require('./routes')
//Dung route
route(app);

//Khai bao va dung session de tao session
const session = require('express-session');
app.use(session({
    secret: 'llldldl',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24 }/*Chu ki song 1 ngay */
}))


app.listen(port, () => console.log(`App listening at http://localhost:${port}`))