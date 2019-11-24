const express = require('express')
const router = express.Router()
const moment = require('moment')

const RestaurantService = require('../services/restaurant-service')
const UserService = require('../services/user-service')
const OrderService = require('../services/order-service')
const FoodService = require('../services/food-service')
const ReviewService = require('../services/review-service.js')

router.get('/all', async(req, res) => {
    var users = await UserService.findAll()
    res.render(__dirname + '/../views/list', { items : users })
})

router.get('/all/json', async (req, res) => {
    const users = await UserService.findAll()
    res.send(users)
  })

router.get('/:id', async(req, res) => {
    const user = await UserService.find(req.params.id)
    if (!user) res.status(404)
    else res.render(__dirname + '/../views/user', { user : user, orders: user.orders })
})

router.get('/:id/json', async (req, res) => {
    const user = await UserService.find(req.params.id)
    if (!user) res.status(404)
    res.send(user)
  })

//get list of restaurants located near user (search by index)
router.get('/:id/restaurants', async(req, res) => {
    try{
        const user = await UserService.find(req.params.id)
        const restaurant = await RestaurantService.getAllRestaurantsByPostalCode(user.index)
        res.render(__dirname + '/../views/list', { items : restaurant })
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error: Failed to get list of  restaurants.");
    }  
})

//http://localhost:3000/user/5dd1412c51db4776931cd848/restaurants

//get list of reviews for user
router.get('/:id/reviews', async(req, res) => {

    try{
        const reviews = await ReviewService.getAllReviews(req.params.id, 'user', UserService)
        const object = await UserService.find(req.params.id)
        res.render(__dirname + '/../views/review', { object : object, reviews : reviews, moment: moment  })
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error: Failed to get list of user reviews.");
    }
    
})

// /user/5dd1412c51db4776931cd848/reviews

//axios.post('/user', {name:'Elsa', index: 10245}).then(console.log)
router.post('/', async(req, res) => {
    const user = await UserService.add(req.body)
    res.send(user)
})

//make review to restaurant
router.post('/:userId/restaurant/:restId/review', async(req, res) => {
    const { userId, restId } = req.params
    try{
        const user = await UserService.find(req.params.userId)
        const rest = await RestaurantService.find(req.params.restId)
        const review = req.body
        const reviewFinal = await ReviewService.createReview(rest, user, review)
        res.send(reviewFinal)
    }catch(err) {
        console.error(err.message);
        res.status(500).send(err.message);//"Server Error: Failed to make a review.");
    }
    
})

//axios.post('/user/5dd1412c51db4776931cd848/restaurant/5dd1958034c8327e643e011a/review',{name: 'cool'}).then(console.log)

//user makes an order in specific restaurant
router.post("/:userId/restaurant/:restId/order", async (req, res) => {
    const { userId, restId } = req.params;
  
    try {
      const user = await UserService.find(userId);
      const rest = await RestaurantService.find(restId);
      const food = await FoodService.getFoodArrayByIds(req.body.food);
      const order = await OrderService.createNewOrder(user, rest, food);
      res.send(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error: Failed to create an order.");
    }
  });

// axios.post('/user/5dd1412051db4776931cd847/restaurant/5dd1413751db4776931cd849/order',{
//             food: ['5dd1414251db4776931cd84c']
//         }).then(console.log)


//update user's details
router.post('/:id/update', async(req, res) => {
    const user = await UserService.find(req.params.id)
    await UserService.update(req.params.id, req.body)
    res.send('user ' + user.name + ' was updated')
})

//axios.post('/user/5dd1412051db4776931cd847', {address: 'CVC'}).then(console.log)

router.delete('/:id', async(req, res) => {
    const user = await UserService.del(req.params.id)
    res.send(user)
})

router.delete('/all', async(req, res) => {
    await UserService.delAll()
    res.send('all users were deleted')
})


module.exports = router