const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const restaurantRouter = require('./routes/restaurant')
const userRouter = require('./routes/user')
const foodRouter = require('./routes/food')
const orderRouter = require('./routes/order')
const menuRouter = require('./routes/menu')
const reviewRouter = require('./routes/review')


require('./mongo-connection')

const app = express()
app.use(cors())



app.use(bodyParser.json())
app.use('/restaurant', restaurantRouter)
app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/order', orderRouter)
app.use('/menu', menuRouter)
app.use('/review', reviewRouter)


app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})


module.exports = app