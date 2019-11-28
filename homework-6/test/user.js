import test from 'ava'
import request from 'supertest'
import app from "../app"

const Enums = require('../helpers/enums')

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

const foodToCreate_1 = {
    name: 'Burger',
    ingridients: ['Bread', 'Cheese', 'Tomato', 'Meet', 'Ketchup'],
    weight: '250'
}

const foodToCreate_2 = {
    name: 'Chips',
    ingridients: ['Potatos', 'Oil', 'Salt'],
    weight: '350'
}

test('Create new user', async t => {
    t.plan(4)
    const res = await request(app).post('/user').send(userToCreate)
    t.is(res.status, 200)
    t.is(res.body.name, userToCreate.name)
    t.is(res.body.address, userToCreate.address)
    t.is(res.body.index, userToCreate.index)
})

test('Fetch the user', async t => {
    t.plan(3)
    const user = (await request(app).post('/user').send(userToCreate)).body
    const fetchResJSON = await request(app).get(`/user/${user._id}/json`)
    t.is(fetchResJSON.status, 200)
    const userFetched = fetchResJSON.body
    t.deepEqual(userFetched, user)
    
    const fetchRes = await request(app).get(`/user/${user._id}`)
    t.is(fetchRes.status, 200)
})

test('Delete a user', async t => {
    t.plan(4)
    const user = (await request(app).post('/user').send(userToCreate)).body
    const deleteRes = await request(app).delete(`/user/${user._id}`)
    t.is(deleteRes.status, 200)
    t.is(deleteRes.ok, true)

    const userToFetchJSON = await request(app).get(`/user/${user._id}/json`)
    t.is(userToFetchJSON.status, 404)
    const userToFetch = await request(app).get(`/user/${user._id}`)
    t.is(userToFetch.status, 404)
})

test('Get list of users', async t => {
    t.plan(4)
    const user = (await request(app).post('/user').send(userToCreate)).body

    const allUsers = await request(app).get('/user/all')
    t.is(allUsers.status, 200)

    const allUsersJSON = (await request(app).get('/user/all/json'))
    t.is(allUsersJSON.status, 200)
    t.true(Array.isArray(allUsersJSON.body),'Body should be an array')
    t.true(allUsersJSON.body.length > 0)

})

test('Get info of the user that does not exist', async t => {
    t.plan(6)
    const user = (await request(app).post('/user').send(userToCreate)).body
    const postalCode = user.index
    
    //delete user
    const deleteRes = await request(app).delete(`/user/${user._id}`)
    t.is(deleteRes.status, 200)
    t.is(deleteRes.ok, true)

    //get list of restaurants 
    const restaurantsFetchedJSON = await request(app).get(`/user/${user._id}/restaurants/json`)
    t.is(restaurantsFetchedJSON.status, 404)
    const restaurantsFetched = await request(app).get(`/user/${user._id}/restaurants`)
    t.is(restaurantsFetched.status, 404)

    //get list of reviews 
    const reviewFetchedJSON = await request(app).get(`/user/${user._id}/reviews/json`)
    t.is(reviewFetchedJSON.status, 404)
    const reviewFetched = await request(app).get(`/user/${user._id}/reviews`)
    t.is(reviewFetched.status, 404)

    // //////list of orders

    // //create restaurant
    // const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    // //delete restaurant
    // const deleteRestRes = await request(app).delete(`/restaurant/${restaurant._id}`)
    // t.is(deleteRestRes.status, 200)
    // t.is(deleteRestRes.ok, true)

    // //list of orders
    // const ordersFetchedJSON = await request(app).get(`/user/${user._id}/restaurant/${restaurant._id}/order/json`)
    // t.is(ordersFetchedJSON.status, 404)
    // const ordersFetched = await request(app).get(`/user/${user._id}/restaurant/${restaurant._id}/order`)
    // t.is(ordersFetched.status, 404)
    
})


test('Get list of restaurants located near user (search by index)' , async t => {
    
    t.plan(4)
    const user = (await request(app).post('/user').send(userToCreate)).body
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    const allRestaurantsForUserJSON = (await request(app).get(`/user/${user._id}/restaurants/json`))
    t.is(allRestaurantsForUserJSON.status, 200)
    t.true(Array.isArray(allRestaurantsForUserJSON.body),'Body should be an array')
    t.true(allRestaurantsForUserJSON.body.length > 0)

    const allRestaurantsForUser = (await request(app).get(`/user/${user._id}/restaurants`))
    t.is(allRestaurantsForUser.status, 200)
})

test('Get list of reviews for user', async t =>{
    t.plan(5)
    const user = (await request(app).post('/user').send(userToCreate)).body
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    //user creates a review
    const reviewParams = {name: 'Famous place'}
    const reviewRes = await request(app).post(`/user/${user._id}/restaurant/${restaurant._id}/review`).send(reviewParams)
    t.is(reviewRes.status, 200)

    //check if it exists in list of reviews of the user
    const reviewFetchedJSON = await request(app).get(`/user/${user._id}/reviews/json`)
    t.is(reviewFetchedJSON.status, 200)
    t.true(Array.isArray(reviewFetchedJSON.body),'Body should be an array')
    t.true(reviewFetchedJSON.body.length > 0)

    const reviewFetched = await request(app).get(`/user/${user._id}/reviews`)
    t.is(reviewFetched.status, 200)
})

test('Make review to a restaurant', async t => {
    t.plan(10)
    const user = (await request(app).post('/user').send(userToCreate)).body
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    const reviewParam = { name: 'Very nice place' }
    const reviewRes = await request(app)
        .post(`/user/${user._id}/restaurant/${restaurant._id}/review`)
        .send(reviewParam)
    t.is(reviewRes.status, 200)

    //fetch this review for the restaurant
    const reviewFetchedJSON = await request(app).get(`/restaurant/${restaurant._id}/reviews/json`)
    t.is(reviewFetchedJSON.status, 200)
    t.true(Array.isArray(reviewFetchedJSON.body),'Body should be an array')
    t.true(reviewFetchedJSON.body.length > 0)

    //delete user
    const deleteUserRes = await request(app).delete(`/user/${user._id}`)
    t.is(deleteUserRes.status, 200)
    t.is(deleteUserRes.ok, true)

    //make review again
    const reviewAgainRes = await request(app)
        .post(`/user/${user._id}/restaurant/${restaurant._id}/review`)
        .send(reviewParam)
    t.is(reviewAgainRes.status, 404)

    //delete restaurant
    const deleteRestRes = await request(app).delete(`/restaurant/${restaurant._id}`)
    t.is(deleteRestRes.status, 200)
    t.is(deleteRestRes.ok, true)

    //make review again
    const reviewAgain_2_Res = await request(app)
        .post(`/user/${user._id}/restaurant/${restaurant._id}/review`)
        .send(reviewParam)
    t.is(reviewAgain_2_Res.status, 404)
})

test('User makes an order in specific restaurant', async t => {
    t.plan(16)
    const user = (await request(app).post('/user').send(userToCreate)).body
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    const food_1 = (await request(app).post('/food').send(foodToCreate_1)).body
    const food_2 = (await request(app).post('/food').send(foodToCreate_2)).body

    const orderParams = {food : [food_1, food_2]}
    const orderRes = await request(app)
        .post(`/user/${user._id}/restaurant/${restaurant._id}/order`)
        .send(orderParams)
    
    t.is(orderRes.status, 200)
    t.is(orderRes.body.status, Enums.OrderStatus.OPEN)
    const order = orderRes.body

    //fetch same user and restaurant again
    const userFetchedJSON = await request(app).get(`/user/${user._id}/json`)
    const restFetchedJSON = await request(app).get(`/restaurant/${restaurant._id}/json`)
    t.is(userFetchedJSON.status, 200)
    t.is(restFetchedJSON.status, 200)
    t.true(Array.isArray(userFetchedJSON.body.orders),'Body should be an array')
    t.true(userFetchedJSON.body.orders.length > 0)
    t.true(Array.isArray(restFetchedJSON.body.orders),'Body should be an array')
    t.true(restFetchedJSON.body.orders.length > 0)

    t.deepEqual(userFetchedJSON.body._id, order.user._id)
    t.deepEqual(restFetchedJSON.body._id, order.restaurant._id)

    //delete user
    const deleteUserRes = await request(app).delete(`/user/${user._id}`)
    t.is(deleteUserRes.status, 200)
    t.is(deleteUserRes.ok, true)

    //make order again
    const orderAgainRes = await request(app)
            .post(`/user/${user._id}/restaurant/${restaurant._id}/order`)
            .send(orderParams)
    t.is(orderAgainRes.status, 404)

    //delete restaurant
    const deleteRestRes = await request(app).delete(`/restaurant/${restaurant._id}`)
    t.is(deleteRestRes.status, 200)
    t.is(deleteRestRes.ok, true)

    //make order again
    const orderAgain_2_Res = await request(app)
        .post(`/user/${user._id}/restaurant/${restaurant._id}/order`)
        .send(orderParams)
    t.is(orderAgain_2_Res.status, 404)
})

test('User cancel order', async t => {
    t.plan(7)

    const user = (await request(app).post('/user').send(userToCreate)).body
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    const food_1 = (await request(app).post('/food').send(foodToCreate_1)).body

    const orderParams = {food : [food_1]}
    const orderRes = await request(app)
        .post(`/user/${user._id}/restaurant/${restaurant._id}/order`)
        .send(orderParams)
    
    t.is(orderRes.status, 200)
    t.is(orderRes.body.status, Enums.OrderStatus.OPEN)
    const order = orderRes.body

    //cancel order
    const orderCancelRes = await request(app)
        .post(`/user/${user._id}/order/${order._id}/cancel`)
    t.is(orderCancelRes.status, 200)
    t.is(orderCancelRes.body.status, Enums.OrderStatus.CANCELLED)

    //delete user
    const deleteUserRes = await request(app).delete(`/user/${user._id}`)
    t.is(deleteUserRes.status, 200)
    t.is(deleteUserRes.ok, true)

    //update order again
    const orderCancelAgainRes = await request(app)
        .post(`/user/${user._id}/order/${order._id}/cancel`)
    t.is(orderCancelAgainRes.status, 404)
})

test('Update user info', async t => {
    t.plan(2)
    const user = (await request(app).post('/user').send(userToCreate)).body
    const updateParam = {address: 'CVC'}
    const userToUpdate = await request(app).post(`/user/${user._id}/update`).send(updateParam)
    t.is(userToUpdate.status, 200)

    const userResultJSON = await request(app).get(`/user/${user._id}/json`)
    t.deepEqual(userResultJSON.body.address, updateParam.address)
})