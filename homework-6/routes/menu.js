const express = require('express')
const router = express.Router()

const MenuService = require('../services/menu-service')
const RestaurantService = require('../services/restaurant-service')


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

router.post('/', async(req, res) => {
    const menu = await MenuService.add(req.body)
    res.send(menu)
})

router.delete('/:id', async(req, res) => {
    await MenuService.del(req.params.id)
    res.send('menu with id : ' + req.params.id + ' was deleted')
})


module.exports = router