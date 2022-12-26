const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routers/user')
const itemRouter =require('./routers/item')
const cartRouter = require('./routers/cart')
const orderRouter = require('./routers/order')
const services = require('./services/render')
const path = require('path')
const ejs = require('ejs')
const morgan = require('morgan')
const { json } = require('body-parser')
require('./db/mongoose')

const port = process.env.PORT || 4000

const app = express()

app.use(bodyParser.urlencoded({ extended: true })); 



// app.set('views', './views');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// log request
app.use(morgan('tiny'));



app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(cartRouter)
app.use(orderRouter)


// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.get('/', services.homeRoutes)
app.post('/cart.ejs', services.cartRoutes)
app.get('/login.ejs', services.loginRoutes)
app.get('/signup.ejs', services.signupRoutes)
app.get('*',services.errorRoutes )


app.listen(port, () => {
    console.log('server listening on port ' + port)
})