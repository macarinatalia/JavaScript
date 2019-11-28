const express = require('express')
const router = express.Router()
const Enums = require('../helpers/enums');

const OrderService = require('../services/order-service')


router.get('/all', async(req, res) => {
    var order = await OrderService.findAll()
    res.render(__dirname + '/../views/list', { items : order })
})

router.get('/all/json', async (req, res) => {
    const order = await OrderService.findAll()
    res.send(order)
})

router.get('/:id', async(req, res) => {
    const order = await OrderService.find(req.params.id)
    if (!order) res.status(404)
    res.render(__dirname + '/../views/data', { data : order })
})

router.get('/:id/json', async (req, res) => {
    const order = await OrderService.find(req.params.id)
    if (!order) res.status(404)
    res.send(order)
})

router.post('/', async(req, res) => {
    const orderParams = req.body
    orderParams.status = Enums.OrderStatus.OPEN
    const order = await OrderService.add(orderParams)
    res.send(order)
})

router.delete('/:id', async(req, res) => {
    const order = await OrderService.del(req.params.id)
    res.send(order)
})

//get orders by status
router.get('/status/:status', async(req, res) => {
    const orders = await OrderService.getOrdersByStatus(req.params.status)
    res.send(orders)
    //res.render(__dirname + '/../views/list', { items : orders })
}) 



//axios.delete('/order/all').then(console.log)
// router.delete('/all', async(req, res) => {
//     await OrderService.delAll()
//     res.send('all orders were deleted')
// })

module.exports = router