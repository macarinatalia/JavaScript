const express = require('express')
const router = express.Router()

const OrderService = require('../services/order-service')


router.get('/all', async(req, res) => {
    var order = await OrderService.findAll()
    res.render(__dirname + '/../views/list', { items : order })
})

router.get('/:id', async(req, res) => {
    const order = await OrderService.find(req.params.id)
    res.render('base', { data : order })
})

router.post('/', async(req, res) => {
    const order = await OrderService.add(req.body)
    res.send(order)
})

//axios.delete('/order/all').then(console.log)
router.delete('/all', async(req, res) => {
    await OrderService.delAll()
    res.send('all orders were deleted')
})

module.exports = router