const paymentRouter = require('./payment')
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
<<<<<<< HEAD
const js = require('./js')
=======
const statisticalRouter = require('./statistical')
>>>>>>> 255169ca4eca3f443570c04ca8db7c1d79920ecf
function route(app) {
   
    app.use('/chart2', js)
    app.use('/payment', paymentRouter)
    app.use('/statistical',statisticalRouter )
    app.use('/employee', employeeRouter)
    app.use('/order', orderRouter)
    app.use('/evaluate', evaluateRouter)
    app.use('/promotion', promotionRouter)
    app.use('/address', addressRouter)
    app.use('/comment', commentRouter)
    app.use('/message', messageRouter)
    app.use('/customer', customerRouter)
    app.use('/login', loginRouter)
    app.use('/products', productsRouter)
    app.use('/', siteRouter)
    
    
}

module.exports = route;