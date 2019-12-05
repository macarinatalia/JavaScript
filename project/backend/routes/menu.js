const express = require('express')
const router = express.Router()

const MenuService = require('../services/menu-service')
const RestaurantService = require('../services/restaurant-service')
const FoodService = require('../services/food-service')

let status = 500  // 406 - Not acceptable

router.get('/all', async(req, res) => {
    var menu = await MenuService.findAll()
    res.render(__dirname + '/../views/list', { items : menu })
})

router.get('/all/json', async (req, res) => {
    const menu = await MenuService.findAll()
    res.send(menu)
})

router.get('/:id', async(req, res) => {
    const menu = await MenuService.find(req.params.id)
    res.render(__dirname + '/../views/menu', { menu : menu })
})

router.get('/:id/json', async (req, res) => {
    const menu = await MenuService.find(req.params.id)
    if (!menu) res.status(404)
    res.send(menu)
})


//get food of the menu
router.get('/:id/food/json', async (req, res) => {
    try {
        const menu = await MenuService.find(req.params.id)
        if (!menu) {
            const er = new Error('No menu with id : ' + req.params.id)
            status = 404
            throw er
        }
        status = 500
        const food = await FoodService.getFoodArrayByIds(menu.food)
        res.send(food)
    } catch (err) {
        res.status(status).send(err.message);
    }
    
})

//update details
router.post('/:id/update', async(req, res) => {
    try {
        const menu = await MenuService.find(req.params.id)
        if(!menu) {
            const er = new Error('No menu with id : ' + req.params.id)
            status = 404
            throw er
        }
        else{
            await MenuService.update(req.params.id, req.body)
            res.send(menu.name + ' was updated')
        }
    } catch (err) {
        res.status(status).send(err.message)
    }
    
})


router.post('/', async(req, res) => {
    const menu = await MenuService.add(req.body)
    res.send(menu)
})

router.delete('/:id', async(req, res) => {
    await MenuService.del(req.params.id)
    res.send('menu with id : ' + req.params.id + ' was deleted')
})


module.exports = router