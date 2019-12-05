const express = require('express')
const router = express.Router()

const FoodService = require('../services/food-service')


router.get('/all', async(req, res) => {
    const food = await FoodService.findAll()
    res.render(__dirname + '/../views/list', { items : food })
})

router.get('/all/json', async (req, res) => {
    const food = await FoodService.findAll()
    res.send(food)
})

router.get('/:id', async(req, res) => {
    const food = await FoodService.find(req.params.id)
    if (!food) res.status(404)
    res.render(__dirname + '/../views/data', { data : food })
})

router.get('/:id/json', async (req, res) => {
    const food = await FoodService.find(req.params.id)
    if (!food) res.status(404)
    res.send(food)
})

router.post('/', async(req, res) => {
    const food = await FoodService.add(req.body)
    res.send(food)
})

router.delete('/:id', async(req, res) => {
    const food = await FoodService.del(req.params.id)
    res.send(food)
})

module.exports = router