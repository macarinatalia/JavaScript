import test from 'ava'
import request from 'supertest'
import app from "../app"

const foodToCreate = {
    name: 'Burger',
    ingridients: ['Bread', 'Cheese', 'Tomato', 'Meet', 'Ketchup'],
    weight: '250'
}


test('Create new food', async t => {
    t.plan(2)
    const foodRes = await request(app).post('/food').send(foodToCreate)
    const food = foodRes.body
    t.is(foodRes.status, 200)
    t.is(food.name, foodToCreate.name)
})

test('Fetch a food by id', async t => {
    t.plan(3)
    const food = (await request(app).post('/food').send(foodToCreate)).body
    const foodFetchResJSON = await request(app).get(`/food/${food._id}/json`)
    t.is(foodFetchResJSON.status, 200)
    const foodFetched = foodFetchResJSON.body
    t.deepEqual(foodFetched, food)

    const foodFetchRes = await request(app).get(`/food/${food._id}`)
    t.is(foodFetchRes.status, 200)
})


test('Delete a food', async t => {
    t.plan(4)

    const food = (await request(app).post('/food').send(foodToCreate)).body
    const foodDeleteRes = await request(app).delete(`/food/${food._id}`)
    t.is(foodDeleteRes.status, 200)
    t.is(foodDeleteRes.ok, true)

    const foodToFetchJSON = await request(app).get(`/food/${food._id}/json`)
    t.is(foodToFetchJSON.status, 404)
    const foodToFetch = await request(app).get(`/food/${food._id}`)
    t.is(foodToFetch.status, 404)
})


test('Get list of food', async t => {
    t.plan(4)
    
    const food = (await request(app).post('/food').send(foodToCreate)).body

    const allFood = await request(app).get('/food/all')
    t.is(allFood.status, 200)

    const allFoodJSON = (await request(app).get('/food/all/json'))
    t.is(allFoodJSON.status, 200)
    t.true(Array.isArray(allFoodJSON.body),'Body should be an array')
    t.true(allFoodJSON.body.length > 0)

})