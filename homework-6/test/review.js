import test from 'ava'
import request from 'supertest'
import app from "../app"

const userToCreate = {
    name: 'Alice',
    address: 'Warschauerstr. 66',
    index: 10245,
    orders: []
}

const restToCreate = {
    name: 'Pi Pa Sa Pikante', 
    address: 'Revaler Straße 8', 
    index: 10245, 
    reviews: []
}

const reviewToCreate ={
    name : 'Nice place'
}

async function setInfo(userToCreate, restToCreate, reviewParams){
    const user = (await request(app).post('/user').send(userToCreate)).body
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    reviewParams.user = user._id
    reviewParams.restaurant = restaurant._id

    const review = await request(app).post('/review').send(reviewParams)

    return review
}

test('Create new review', async t => {
    t.plan(2)
    const reviewRes = await setInfo(userToCreate, restToCreate, reviewToCreate)
    const review = reviewRes.body
    t.is(reviewRes.status, 200)
    t.is(review.name, reviewToCreate.name)
})

test('Fetch a review', async t => {
    t.plan(3)
    const review = (await setInfo(userToCreate, restToCreate, reviewToCreate)).body
    const reviewFetchResJSON = await request(app).get(`/review/${review._id}/json`)
    t.is(reviewFetchResJSON.status, 200)
    const reviewFetched = reviewFetchResJSON.body
    t.deepEqual(reviewFetched._id, review._id)

    const reviewFetchRes = await request(app).get(`/review/${review._id}`)
    t.is(reviewFetchRes.status, 200)
})

test('Delete a review', async t => {
    t.plan(3)

    const review = (await setInfo(userToCreate, restToCreate, reviewToCreate)).body
    const reviewDeleteRes = await request(app).delete(`/review/${review._id}`)
    t.is(reviewDeleteRes.status, 200)
    t.is(reviewDeleteRes.ok, true)

    const reviewToFetch = await request(app).get(`/review/${review._id}/json`)
    t.is(reviewToFetch.status, 404)
})


test('Get list of reviews', async t => {
    t.plan(4)
    
    const review = (await setInfo(userToCreate, restToCreate, reviewToCreate)).body

    const allReviews = await request(app).get('/review/all')
    t.is(allReviews.status, 200)

    const allReviewsJSON = (await request(app).get('/review/all/json'))
    t.is(allReviewsJSON.status, 200)
    t.true(Array.isArray(allReviewsJSON.body),'Body should be an array')
    t.true(allReviewsJSON.body.length > 0)

})