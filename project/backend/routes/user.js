const express = require('express')
const router = express.Router()
const moment = require('moment')

const RestaurantService = require('../services/restaurant-service')
const UserService = require('../services/user-service')
const OrderService = require('../services/order-service')
const FoodService = require('../services/food-service')
const ReviewService = require('../services/review-service.js')

let status = 500  // 406 - Not acceptable

router.get('/all', async(req, res) => {
    var users = await UserService.findAll()
    res.render(__dirname + '/../views/list', { items : users })
})

router.get('/all/json', async (req, res) => {
    const users = await UserService.findAll()
    res.send(users)
  })

  //login user
router.post('/login/json', async(req, res) => {
    const user = await UserService.findByParameter(req.body)
    console.log(user)
    res.send(user)
})

router.get('/:id', async(req, res) => {
    const user = await UserService.find(req.params.id)
    if (!user) {
        res.status(404)
        res.render(__dirname + '/../views/nofound')
    }
    else res.render(__dirname + '/../views/user', { user : user, orders: user.orders })
})

router.get('/:id/json', async (req, res) => {
    const user = await UserService.find(req.params.id)
    if (!user) res.status(404)
    res.send(user)
  })

//get list of restaurants located near user (search by index)
router.get('/:id/restaurants', async(req, res) => {
    const userId = req.params.id
    try{
        const user = await UserService.find(userId)
        if (!user) {
            const er = new Error('No user with id : ' + userId)
            status = 404
            throw er
        }
        status = 500
        const restaurant = await RestaurantService.getAllRestaurantsByPostalCode(user.index)
        res.render(__dirname + '/../views/list', { items : restaurant })
    } catch(err) {
        res.status(status).send(err.message)
    }  
})

router.get('/:id/restaurants/json', async(req, res) => {
    const userId = req.params.id
    try{
        const user = await UserService.find(userId)
        if (!user) {
            const er = new Error('No user with id : ' + userId)
            status = 404
            throw er
        }
        status = 500
        const restaurant = await RestaurantService.getAllRestaurantsByPostalCode(user.index)
        res.send(restaurant)
    } catch(err) {
        res.status(status).send(err.message)
    }  
})

//http://localhost:3000/user/5dd1412c51db4776931cd848/restaurants

//get list of reviews for user
router.get('/:id/reviews', async(req, res) => {
    try{
        const object = await UserService.find(req.params.id)
        if (!object) {
            const er = new Error('No user with id : ' + req.params.id)
            status = 404
            throw er
        }
        status = 500
        const reviews = await ReviewService.getAllReviews(req.params.id, 'user', UserService)
        res.render(__dirname + '/../views/review', { object : object, reviews : reviews, moment: moment  })
    } catch(err) {
        res.status(status).send(err.message)
    }
})

// /user/5dd1412c51db4776931cd848/reviews
router.get('/:id/reviews/json', async(req, res) => {
    try{
        const object = await UserService.find(req.params.id)
        if (!object) {
            const er = new Error('No user with id : ' + req.params.id)
            status = 404
            throw er
        }
        status = 500
        const reviews = await ReviewService.getAllReviews(req.params.id, 'user', UserService)
        res.send(reviews) 
    } catch(err) {
        res.status(status).send(err.message)
    }
})



//axios.post('/user', {name:'Elsa', index: 10245}).then(console.log)
router.post('/', async(req, res) => {
    const user = await UserService.add(req.body)
    res.send(user)
})

//make review to restaurant
router.post('/:userId/restaurant/:restId/review', async(req, res) => {
    const { userId, restId } = req.params
    try{
        const user = await UserService.find(userId)
        const rest = await RestaurantService.find(restId)
        const review = req.body
        if(!user || !rest){
            const er = new Error('No such object')
            status = 404
            throw er
        }
        status = 500
        const reviewFinal = await ReviewService.createReview(rest, user, review)
        await RestaurantService.update(rest.id, {$push: {reviews: reviewFinal}})
        await UserService.update(user.id, {$push: {reviews: reviewFinal}})
        
        res.send(reviewFinal)
    }catch(err) {
        res.status(status).send(err.message)
    }
    
})

//axios.post('/user/5dd1412c51db4776931cd848/restaurant/5dd1958034c8327e643e011a/review',{name: 'cool'}).then(console.log)

//user makes an order in specific restaurant
router.post("/:userId/restaurant/:restId/order", async (req, res) => {
    const { userId, restId } = req.params;
  
    try {
        const user = await UserService.find(userId);
        const rest = await RestaurantService.find(restId);

        if(!user || !rest){
            const er = new Error('No such object')
            status = 404
            throw er
        }
        status = 500
        const food = await FoodService.getFoodArrayByIds(req.body.food);
        const order = await OrderService.createNewOrder(user, rest, food);

        // await RestaurantService.update(rest.id,{ $push: {orders: order, visitors: user}})
        // await UserService.update(user.id,{ $push: {orders: order}})
        res.send(order);
    } catch (err) {
        res.status(status).send(err.message)
    }
  });

// axios.post('/user/5dd1412051db4776931cd847/restaurant/5dd1413751db4776931cd849/order',{
//             food: ['5dd1414251db4776931cd84c']
//         }).then(console.log)


//axios.post('/user/5dd1412051db4776931cd847', {address: 'CVC'}).then(console.log)

//user cancel an order 
router.post("/:userId/order/:orderId/cancel", async (req, res) => {
    const { userId, orderId } = req.params;
  
    try {
        const user = await UserService.find(userId);
        const order = await OrderService.find(orderId);

        if(!user || !orderId){
            const er = new Error('No such object')
            status = 404
            throw er
        }
        status = 500
        await OrderService.cancellOrder(order);
        res.send(order);
    } catch (err) {
        res.status(status).send(err.message)
    }
  });

// axios.post('/user/5ddfc5c47a553c056aad877d/order/5ddfc5c47a553c056aad878d/cancel').then(console.log)


//update user's details
router.post('/:id/update', async(req, res) => {
    const user = await UserService.update(req.params.id, req.body)
    res.send(user)
})



router.delete('/:id', async(req, res) => {
    const user = await UserService.del(req.params.id)
    res.send(user)
})

// router.delete('/all', async(req, res) => {
//     await UserService.delAll()
//     res.send('all users were deleted')
// })


module.exports = router