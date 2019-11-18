const express = require('express')
const router = express.Router()

const FoodService = require('../services/food-service')


router.get('/all', async(req, res) => {
    var food = await FoodService.findAll()
    res.render(__dirname + '/../views/list', { items : food })
})

router.get('/:id', async(req, res) => {
    const food = await FoodService.find(req.params.id)
    res.render('base', { data : food })
})

router.post('/', async(req, res) => {
    const food = await FoodService.add(req.body)
    res.send(food)
})


router.delete('/all', async(req, res) => {
    await FoodService.delAll()
    res.send('all food was deleted')
})

module.exports = router