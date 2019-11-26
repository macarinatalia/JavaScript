const express = require('express')
const router = express.Router()
const moment = require('moment')

const RestaurantService = require('../services/restaurant-service')
const MenuService = require('../services/menu-service')
const FoodService = require('../services/food-service')
const UserService = require('../services/user-service')
const ReviewService = require('../services/review-service')

let status = 500  // 406 - Not acceptable

router.get('/all', async(req, res) => {
    var restaurants = await RestaurantService.findAll()
    res.render(__dirname + '/../views/list', { items : restaurants })
})

router.get('/all/json', async (req, res) => {
    const restaurants = await RestaurantService.findAll()
    res.send(restaurants)
  })

router.get('/:id', async(req, res) => {
    var restaurant = await RestaurantService.find(req.params.id)
    if (!restaurant) {
        res.status(404)
        res.render(__dirname + '/../views/nofound')
    }
    else res.render(__dirname + '/../views/restaurant', { restaurant : restaurant })
})

router.get('/:id/json', async (req, res) => {
    const restaurant = await RestaurantService.find(req.params.id)
    if (!restaurant) res.status(404)
    res.send(restaurant)
  })

//get all visitors for restaurant
router.get('/:id/visitors', async(req, res) => {
    try{
        const restaurant = await RestaurantService.find(req.params.id)
        if (!restaurant) {
            const er = new Error('No restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
        status = 500
        //extract user ids
        const userIds = []
        restaurant.visitors.forEach(user => {
            userIds.push(user.id)
        });
        const userParam = { _id : { $in : userIds}}
        const users = await UserService.findByParameter(userParam)

        res.render(__dirname + '/../views/list', { items : users })
    } catch(err) {
        res.status(status).send(err.message);
    }
   
})
//http://localhost:3000/restaurant/5dd1413751db4776931cd849/visitors

router.get('/:id/visitors/json', async(req, res) => {
    try{
        const restaurant = await RestaurantService.find(req.params.id)
        if (!restaurant) {
            const er = new Error('No restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
        status = 500
        //extract user ids
        const userIds = []
        restaurant.visitors.forEach(user => {
            userIds.push(user.id)
        });
        const userParam = { _id : { $in : userIds}}
        const users = await UserService.findByParameter(userParam)
        res.send(users)
    } catch(err) {
        res.status(status).send(err.message);
    }
   
})


//get list of restaurants searched by postalcode
router.get('/postal/:postalcode', async(req, res) => {
    const restaurant = await RestaurantService.getAllRestaurantsByPostalCode(req.params.postalcode)
    res.render(__dirname + '/../views/list', { items : restaurant })
}) 

//http://localhost:3000/restaurant/postal/10245

router.get('/postal/:postalcode/json', async(req, res) => {
    const restaurant = await RestaurantService.getAllRestaurantsByPostalCode(req.params.postalcode)
    res.send(restaurant)
}) 

//get list of reviews for restaurant
router.get('/:id/reviews', async(req, res) => {
    try {
        const object = await RestaurantService.find(req.params.id)
        if (!object) {
            const er = new Error('No restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
        status = 500
        const reviews = await ReviewService.getAllReviews(req.params.id, 'restaurant', RestaurantService)
        res.render(__dirname + '/../views/review', { object : object, reviews : reviews, moment: moment  })
    } catch (err) {
        res.status(status).send(err.message)
    }  
}) 

// http://localhost:3000/restaurant/5dd1958034c8327e643e011a/reviews

router.get('/:id/reviews/json', async(req, res) => {
    try {
        const object = await RestaurantService.find(req.params.id)
        if (!object) {
            const er = new Error('No restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
        status = 500
        const reviews = await ReviewService.getAllReviews(req.params.id, 'restaurant', RestaurantService)
        res.send(reviews)
    } catch (err) {
        res.status(status).send(err.message)
    }  
}) 

//get menu for the restaurant
router.get('/:id/menu', async(req, res) => {
    try {
        const restaurant = await RestaurantService.find(req.params.id)
        if (!restaurant) {
            const er = new Error('No restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
        if (restaurant.menu) {
            status = 500
            const menu = await MenuService.find(restaurant.menu._id)
            res.render(__dirname + '/../views/menu', { menu : menu })
        }
        else{
            const er = new Error('No menu for restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
    } catch (err) {
        res.status(status).send(err.message)//"Server Error: Failed to print menu");
    }
})
//http://localhost:3000/restaurant/5dd1958034c8327e643e011a/menu

router.get('/:id/menu/json', async(req, res) => {
    try {
        const restaurant = await RestaurantService.find(req.params.id)
        if (!restaurant) {
            const er = new Error('No restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
        if (restaurant.menu) {
            status = 500
            const menu = await MenuService.find(restaurant.menu._id)
            res.send(menu)
        }
        else{
            const er = new Error('No menu for restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
    } catch (err) {
        res.status(status).send(err.message)//"Server Error: Failed to print menu");
    }
})


router.post('/', async(req, res) => {
    const rest = await RestaurantService.add(req.body)
    res.send(rest)
})

//create menu for restaurant
router.post('/:restId/menu', async(req, res) => {
    try {
        const rest = await RestaurantService.find(req.params.restId).catch((err) => console.log(err))
        if(!rest.menu) {
            const menuFood = req.body.food
            const menuPrice = req.body.price
            const foodList = await FoodService.getFoodArrayByIds(menuFood)
            const menu = await MenuService.createMenu(rest, foodList, menuPrice)
            
            await RestaurantService.update(rest.id, {menu: menu})
            res.send(menu)
        }
        else {
            const er = new Error('This restaurant already has a menu') 
            status = 406 
            throw er
        }
    } catch (err) {
        res.status(status).send(err.message)//"Server Error: Failed to create menu");
    }
    
})

//axios.post('/restaurant/5ddaeea973f8c31e6f2dd7d5/menu',{food: ['5ddaef2273f8c31e6f2dd7d6', '5ddaef3173f8c31e6f2dd7d7'], price: ['2.0', '3,0']}).then(console.log)


//update details
router.post('/:id/update', async(req, res) => {
    try {
        const rest = await RestaurantService.find(req.params.id)
        if(!rest) {
            const er = new Error('No restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
        else{
            await RestaurantService.update(req.params.id, req.body)
            res.send(rest.name + ' was updated')
        }
    } catch (err) {
        res.status(status).send(err.message)
    }
    
})

router.delete('/:id', async(req, res) => {
    const restaurant = await RestaurantService.del(req.params.id)
    res.send(restaurant)
})

// router.delete('/all', async(req, res) => {
//     await RestaurantService.delAll()
//     res.send('all restaurants deleted')
// })

//delete menu for restaurant
router.delete('/:restId/menu', async(req, res) => {
    try {
        const rest = await RestaurantService.find(req.params.restId)
        if(!rest) {
            const er = new Error('No restaurant with id : ' + req.params.id)
            status = 404
            throw er
        }
        else{
            status = 500
            await MenuService.del(rest.menu)
            await RestaurantService.update(rest.id, { menu : null })
            res.send('menu deleted')
        }
    } catch (err) {
        res.status(status).send(err.message)
    }
})

//axios.delete('/restaurant/5dd1958034c8327e643e011a/menu').then(console.log)


module.exports = router
