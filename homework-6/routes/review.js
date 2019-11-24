const express = require('express')
const router = express.Router()

const ReviewService = require('../services/review-service')


router.get('/all', async(req, res) => {
    var review = await ReviewService.findAll()
    res.render(__dirname + '/../views/list', { items : review })
})

router.get('/all/json', async (req, res) => {
    const review = await ReviewService.findAll()
    res.send(review)
  })

router.get('/:id', async(req, res) => {
    const review = await ReviewService.find(req.params.id)
    res.render('base', { data : review })
})

router.get('/:id/json', async (req, res) => {
    const review = await ReviewService.find(req.params.id)
    if (!review) res.status(404)
    res.send(review)
  })

router.post('/', async(req, res) => {
    const review = await ReviewService.add(req.body)
    res.send(review)
})


router.delete('/all', async(req, res) => {
    await ReviewService.delAll()
    res.send('all food was deleted')
})

module.exports = router