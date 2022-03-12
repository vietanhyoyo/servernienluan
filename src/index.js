const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 5000
const cors = require('cors')

//Dung bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Khai bao database voi mongodb
const db = require('./config/db')
db.connect()

//Khai bao route
const route = require('./routes')

//Dung morgan de kiem tra su kien tren trinh duyet
app.use(morgan('combined'))

//Dung cors
app.use(cors())

//Dung route
route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))