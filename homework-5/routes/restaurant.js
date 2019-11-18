const express = require('express')
const router = express.Router()
const moment = require('moment')

const RestaurantService = require('../services/restaurant-service')
const MenuService = require('../services/menu-service')
const FoodService = require('../services/food-service')
const UserService = require('../services/user-service')
const ReviewService = require('../services/review-service')

router.get('/all', async(req, res) => {
    var restaurants = await RestaurantService.findAll()
    res.render(__dirname + '/../views/list', { items : restaurants })
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    var restaurant = await RestaurantService.find(id)
    res.render(__dirname + '/../views/restaurant', { restaurant : restaurant })
})

//get all visitors for restaurant
router.get('/:id/visitors', async(req, res) => {
    const restaurant = await RestaurantService.find(req.params.id)
    const users = []
    for (var i = 0; i < restaurant.visitors.length; i++) {
      const f = await UserService.find(restaurant.visitors[i]._id)
      users.push(f)
  }
    res.render(__dirname + '/../views/list', { items : users })
})
//http://localhost:3000/restaurant/5dd1413751db4776931cd849/visitors

//get list of restaurant searched by postalcode
router.get('/postal/:postalcode', async(req, res) => {
    const restaurant = await RestaurantService.getAllRestaurantsByPostalCode(req.params.postalcode)
    res.render(__dirname + '/../views/list', { items : restaurant })
}) 

//http://localhost:3000/restaurant/postal/10245

//get list of reviews for restaurant
router.get('/:id/reviews', async(req, res) => {
    const reviews = await ReviewService.getAllReviews(req.params.id, 'restaurant', RestaurantService)
    const object = await RestaurantService.find(req.params.id)
    res.render(__dirname + '/../views/review', { object : object, reviews : reviews, moment: moment  })
}) 

// http://localhost:3000/restaurant/5dd1958034c8327e643e011a/reviews


//print menu for the restaurant
router.get('/:id/menu', async(req, res) => {
    const restaurant = await RestaurantService.find(req.params.id)
    if (restaurant.menu == undefined) res.render(__dirname + '/../views/nofound')
    else {
        const menu = await MenuService.find(restaurant.menu._id)
        res.render(__dirname + '/../views/menu', { menu : menu })
    }
})
//http://localhost:3000/restaurant/5dd1958034c8327e643e011a/menu


router.post('/', async(req, res) => {
    const rest = await RestaurantService.add(req.body)
    res.send(rest)
})

//create menu for restaurant
router.post('/:restId/menu', async(req, res) => {
    const rest = await RestaurantService.find(req.params.restId).catch((err) => console.log(err))
    if(!rest.menu) {
        const menuFood = req.body.food
        const menuPrice = req.body.price
        const foodList = await FoodService.getFoodArrayByIds(menuFood)
        const menu = await MenuService.createMenu(rest, foodList, menuPrice)
        res.send(menu)
    }
    else throw new Error('This restaurant already has a menu') 
})

//axios.post('/restaurant/5dd1958034c8327e643e011a/menu',{food: ['5dd1414251db4776931cd84a', '5dd1414251db4776931cd84b'], price: ['2.0', '3,0']}).then(console.log)


//update details
router.post('/:id/update', async(req, res) => {
    const rest = await RestaurantService.find(req.params.id)
    await RestaurantService.update(req.params.id, req.body)
    res.send(rest.name + ' was updated')
})

router.delete('/:id', async(req, res) => {
    const restaurant = await RestaurantService.del(req.params.id)
    res.send(restaurant)
})

router.delete('/all', async(req, res) => {
    await RestaurantService.delAll()
    res.send('all restaurants deleted')
})

//delete menu for restaurant
router.delete('/:restId/menu', async(req, res) => {
    const rest = await RestaurantService.find(req.params.restId).catch((err) => console.log(err))
    await MenuService.del(rest.menu)
    rest.menu = null
    await rest.save()
    res.send('menu deleted')
})

//axios.delete('/restaurant/5dd1958034c8327e643e011a/menu').then(console.log)


module.exports = router
