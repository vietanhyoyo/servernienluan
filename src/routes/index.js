const addressRouter = require('./address')
const commentRouter = require('./comment')
const employeeRouter = require('./employee')
const orderRouter = require('./order')
const productsRouter = require('./products')
const customerRouter = require('./customer')
const promotionRouter = require('./promotion')
const evaluateRouter = require('./evaluate')
const messageRouter = require('./message')
const loginRouter = require('./login')
const siteRouter = require('./site')

function route(app) {

    app.use('/employee', employeeRouter)
    app.use('/order', orderRouter)
    app.use('/evaluate', evaluateRouter)
    app.use('/promotion', promotionRouter)
    app.use('/address',addressRouter)
    app.use('/comment',commentRouter)
    app.use('/message', messageRouter)
    app.use('/customer', customerRouter)
    app.use('/login', loginRouter)
    app.use('/products', productsRouter)
    app.use('/', siteRouter)

}

module.exports = route;