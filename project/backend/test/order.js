import test from 'ava'
import request from 'supertest'
import app from "../app"

const orderToCreate = {
    food: []
}

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



async function setInfo(userToCreate, restToCreate, food, orderParams){

    const user = (await request(app).post('/user').send(userToCreate)).body
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body
    const food_1 = (await request(app).post('/food').send(food[0])).body
    const food_2 = (await request(app).post('/food').send(food[1])).body

    orderParams.user = user._id
    orderParams.restaurant = restaurant._id
    orderParams.food.push(food_1)
    orderParams.food.push(food_2)

    const order = await request(app).post('/order').send(orderParams)
    return order
}

test('Create new order', async t => {
    t.plan(1)
    const orderRes = await setInfo(userToCreate, restToCreate, [foodToCreate_1, foodToCreate_2], orderToCreate)
    t.is(orderRes.status, 200)
})

test('Fetch an order', async t => {
    t.plan(3)
    const order = (await setInfo(userToCreate, restToCreate, [foodToCreate_1, foodToCreate_2], orderToCreate)).body
    const orderFetchResJSON = await request(app).get(`/order/${order._id}/json`)
    t.is(orderFetchResJSON.status, 200)
    const orderFetched = orderFetchResJSON.body
    t.deepEqual(orderFetched._id, order._id)

    const orderFetchRes = await request(app).get(`/order/${order._id}`)
    t.is(orderFetchRes.status, 200)
})

test('Delete an order', async t => {
    t.plan(4)

    const order = (await setInfo(userToCreate, restToCreate, [foodToCreate_1, foodToCreate_2], orderToCreate)).body
    const orderDeleteRes = await request(app).delete(`/order/${order._id}`)
    t.is(orderDeleteRes.status, 200)
    t.is(orderDeleteRes.ok, true)

    const orderToFetchJSON = await request(app).get(`/order/${order._id}/json`)
    t.is(orderToFetchJSON.status, 404)
    const orderToFetch = await request(app).get(`/order/${order._id}`)
    t.is(orderToFetch.status, 404)
})


test('Get list of orders', async t => {
    t.plan(4)
    
    const order = (await setInfo(userToCreate, restToCreate, [foodToCreate_1, foodToCreate_2], orderToCreate)).body
    
    const allOrders = await request(app).get('/order/all')
    t.is(allOrders.status, 200)

    const allOrdersJSON = (await request(app).get('/order/all/json'))
    t.is(allOrdersJSON.status, 200)
    t.true(Array.isArray(allOrdersJSON.body),'Body should be an array')
    t.true(allOrdersJSON.body.length > 0)

})

test('Get orders searched by status', async t => {
    t.plan(3)
    const order = (await request(app).post('/order').send(orderToCreate)).body
    
    const allOrders = (await request(app).get(`/order/status/${order.status}`))
    t.is(allOrders.status, 200)
    t.true(Array.isArray(allOrders.body),'Body should be an array')
    t.true(allOrders.body.length > 0)

})