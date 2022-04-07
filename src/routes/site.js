const experss = require('express')
const route = experss.Router();

const siteController = require('../app/controllers/SiteController')

route.get('/capnhatthoigian', siteController.updateTime)
route.get('/', siteController.index)

module.exports = route