const express = require('express')
const RestaurantService = require('./services/restaurant-service')
const VisitorService = require('./services/visitor-service')
const bodyParser = require('body-parser')

const app = express()
const port = 3000


app.use(bodyParser.json())
app.set('view engine', 'pug')



app.get('/', (req, res) => {
    //res.send('hello')
    //res.sendFile(__dirname + '/index.html')  //send files
    res.render('index')
})

app.get('/restaurant/all', async(req, res) => {
  var restaurants = await RestaurantService.findAll()
  res.render(__dirname + '/views/restaurants', { allRestaurants : restaurants })
})

app.get('/visitor/all', async(req, res) => {
  var visitors = await VisitorService.findAll()
  res.render(__dirname + '/views/visitors', { visitors : visitors })
})

app.get('/restaurant/:id', async(req, res) => {
  const id = req.params.id
  var restaurant = await RestaurantService.find(id)
  res.render(__dirname + '/views/restaurant', { restaurant : restaurant })
})

app.get('/visitor/:id', async(req, res) => {
  const id = req.params.id
  var visitor = await VisitorService.find(id)

  if (visitor == undefined) res.render(__dirname + '/views/index')
  else res.render(__dirname + '/views/visitor', { visitor : visitor, orders: visitor.orders })
})
  

app.post('/restaurant', async(req, res) => {
  const rest = await RestaurantService.add(req.body)
  res.send(rest)
})

//axios.post('/visitor', {name:'Elsa'}).then(console.log)
app.post('/visitor', async(req, res) => {
  const visitor = await VisitorService.add(req.body)
  res.send(visitor)
})

//update visitor's age
//axios.post('/visitor/3/20').then(console.log)
app.post('/visitor/:id/:age', async(req, res) => {
  const allVisitors = await VisitorService.findAll()
  const visitor = allVisitors.find (p => p.id == req.params.id);
  visitor.age = req.params.age
  await VisitorService.update(req.params.id, visitor)
  res.send('visitor ' + visitor.name + ' was updated')
})

//update visitor's orders
//axios.post('/visitor/1', {orders: 'cola, sandwitch, fries'}).then(console.log)
app.post('/visitor/:id/', async(req, res) => {
  const allVisitors = await VisitorService.findAll()
  const visitor = allVisitors.find (p => p.id == req.params.id);
  const order = req.body.orders
  visitor.orders.push(order)
  await VisitorService.update(req.params.id, visitor)
  res.send('visitor ' + visitor.name + ' was updated')
})

//axios.delete('/restaurant/6').then(console.log)
app.delete('/restaurant/:id', async(req, res) => {
  const id = req.params.id
  await RestaurantService.del(id)
  res.send('ok')
})

app.delete('/visitor/:id', async(req, res) => {
  const id = req.params.id
  await VisitorService.del(id)
  res.send('ok')
})

app.listen(port, () =>{
  console.log('server is listening')
})