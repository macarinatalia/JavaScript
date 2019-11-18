const express = require('express')
const bodyParser = require('body-parser')
const restaurantRouter = require('./routes/restaurant')
const userRouter = require('./routes/user')
const foodRouter = require('./routes/food')
const orderRouter = require('./routes/order')
const menuRouter = require('./routes/menu')
const reviewRouter = require('./routes/review')

require('./mongo-connection')

const app = express()
const port = 3000



app.use(bodyParser.json())
app.use('/restaurant', restaurantRouter)
app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/order', orderRouter)
app.use('/menu', menuRouter)
app.use('/review', reviewRouter)


app.set('view engine', 'pug')

app.get('/', (req, res) => {
    //res.send('hello')
    //res.sendFile(__dirname + '/index.html')  //send files
    res.render('index')
})


app.listen(port, () =>{
  console.log('server is listening')
})