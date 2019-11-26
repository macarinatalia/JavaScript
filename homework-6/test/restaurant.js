import test from 'ava'
import request from 'supertest'
import app from "../app"

const restToCreate = {
    name: 'Pi Pa Sa Pikante', 
    address: 'Revaler Straße 8', 
    index: 10245, 
    menu: undefined
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

const userToCreate = {
    name: 'Alice',
    address: 'Warschauerstr. 66',
    index: 10245,
    orders: []
}

const menuToCreate = {
    food: [],
    price: []
}

async function createMenu(restaurant, food, price, menuParams){
    const food_1 = (await request(app).post('/food').send(food[0])).body
    const food_2 = (await request(app).post('/food').send(food[1])).body

    menuParams.name = 'Menu ' + restaurant.name
    menuParams.restaurant = restaurant._id
    menuParams.food.push(food_1)
    menuParams.food.push(food_2)
    menuParams.price.push(price[0])
    menuParams.price.push(price[1])

    const menu = await request(app).post(`/restaurant/${restaurant._id}/menu`).send(menuParams)

    return menu
}

test('Create new restaurant', async t => {
    t.plan(4)
    const res = await request(app).post('/restaurant').send(restToCreate)

    t.is(res.status, 200)
    t.is(res.body.name, restToCreate.name)
    t.is(res.body.address, restToCreate.address)
    t.is(res.body.index, restToCreate.index)
    
})

test('Fetch the restaurant', async t => {
    t.plan(3)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body
    const fetchResJSON = await request(app).get(`/restaurant/${restaurant._id}/json`)
    t.is(fetchResJSON.status, 200)
    const restaurantFetched = fetchResJSON.body
    t.deepEqual(restaurantFetched, restaurant)

    const fetchRes = await request(app).get(`/restaurant/${restaurant._id}`)
    t.is(fetchRes.status, 200)
    
})

test('Delete restaurant', async t => {
    t.plan(4)

    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body
    const deleteRes = await request(app).delete(`/restaurant/${restaurant._id}`)
    t.is(deleteRes.status, 200)
    t.is(deleteRes.ok, true)

    const restaurantToFetchJSON = await request(app).get(`/restaurant/${restaurant._id}/json`)
    t.is(restaurantToFetchJSON.status, 404)
    const restaurantToFetch = await request(app).get(`/restaurant/${restaurant._id}`)
    t.is(restaurantToFetch.status, 404)
})


test('Get list of restaurants', async t => {
    t.plan(4)
    
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    const allRestaurants = await request(app).get('/restaurant/all')
    t.is(allRestaurants.status, 200)

    const allRestaurantsJSON = (await request(app).get('/restaurant/all/json'))
    t.is(allRestaurantsJSON.status, 200)
    t.true(Array.isArray(allRestaurantsJSON.body),'Body should be an array')
    t.true(allRestaurantsJSON.body.length > 0)
})

test('Get info of the restaurant that does not exist', async t => {
    t.plan(10)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body
    const postalCode = restaurant.index
    //delete restaurant
    const deleteRes = await request(app).delete(`/restaurant/${restaurant._id}`)
    t.is(deleteRes.status, 200)
    t.is(deleteRes.ok, true)

    //update restaurant
    const update = {address: 'xxxx'}
    const restToUpdate = await request(app).post(`/restaurant/${restaurant._id}/update`).send(update)
    t.is(restToUpdate.status, 404)

    //get list of visitors 
    const visitorFetchedJSON = await request(app).get(`/restaurant/${restaurant._id}/visitors/json`)
    t.is(visitorFetchedJSON.status, 404)
    const visitorFetched = await request(app).get(`/restaurant/${restaurant._id}/visitors`)
    t.is(visitorFetched.status, 404)

    //get list of reviews 
    const reviewFetchedJSON = await request(app).get(`/restaurant/${restaurant._id}/reviews/json`)
    t.is(reviewFetchedJSON.status, 404)
    const reviewFetched = await request(app).get(`/restaurant/${restaurant._id}/reviews`)
    t.is(reviewFetched.status, 404)

    //get menu for this restaurant
    const menuFetchedJSON = await request(app).get(`/restaurant/${restaurant._id}/menu/json`) 
    t.is(menuFetchedJSON.status, 404)
    const menuFetched = await request(app).get(`/restaurant/${restaurant._id}/menu`) 
    t.is(menuFetched.status, 404)

    //delete menu 
    const deleteMenuRes = await request(app).delete(`/restaurant/${restaurant._id}/menu`)
    t.is(deleteMenuRes.status, 404)
})

test('Get visitors of the restaurant', async t => {
    t.plan(7)
    
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    //get visitors for freshly made restaurant (length == 0)
    const allVisitorsRes = await request(app).get(`/restaurant/${restaurant._id}/visitors`)
    t.is(allVisitorsRes.status, 200)

    const allVisitorsJSON = (await request(app).get(`/restaurant/${restaurant._id}/visitors/json`))
    t.is(allVisitorsJSON.status, 200)

    t.true(allVisitorsJSON.body.length == 0)

    // user makes order and become a visitor
    const user = (await request(app).post('/user').send(userToCreate)).body
    const foodParams = (await request(app).post('/food').send(foodToCreate_1)).body
    const order = {food: foodParams}
    const orderRes = await request(app).post(`/user/${user._id}/restaurant/${restaurant._id}/order`).send(order)
    t.is(orderRes.status, 200)

    //fetch again visitors of restaurant
    const allVisitorsFetchedJSON = (await request(app).get(`/restaurant/${restaurant._id}/visitors/json`))
    t.is(allVisitorsFetchedJSON.status, 200)
    t.true(allVisitorsFetchedJSON.body.length == 1)

    const allVisitorsFetched = (await request(app).get(`/restaurant/${restaurant._id}/visitors`))
    t.is(allVisitorsFetched.status, 200)
})

test('Create menu for restaurant', async t => {
    t.plan(3)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body
    const menuRes = await createMenu(restaurant, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)
    t.is(menuRes.status, 200)
    const menu = menuRes.body

    //fetch menu id from restaurant
    const restFetchedRes = await request(app).get(`/restaurant/${restaurant._id}/json`)
    const restFetched = restFetchedRes.body
    t.is(restFetchedRes.status, 200)
    t.deepEqual(menu._id, restFetched.menu._id)
})

test('Create menu for restaurant that has a menu', async t => {
    t.plan(2)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body
    const menu_1_Res = await createMenu(restaurant, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)
    t.is(menu_1_Res.status, 200)
    const menu_1 = menu_1_Res.body

    //create one more menu
    const menu_2_Res = await createMenu(restaurant, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)
    t.is(menu_2_Res.status, 406)
})

test('Get list of restaurants searched by postalcode', async t => {
    t.plan(4)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body
    const allRestaurantsForPostalCodeJSON = (await request(app).get(`/restaurant/postal/${restaurant.index}/json`))
    t.is(allRestaurantsForPostalCodeJSON.status, 200)
    t.true(Array.isArray(allRestaurantsForPostalCodeJSON.body),'Body should be an array')
    t.true(allRestaurantsForPostalCodeJSON.body.length > 0)

    const allRestaurantsForPostalCode = (await request(app).get(`/restaurant/postal/${restaurant.index}`))
    t.is(allRestaurantsForPostalCode.status, 200)
})

test('Get list of reviews for restaurant', async t => {
    t.plan(5)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    //user makes a review
    const user = (await request(app).post('/user').send(userToCreate)).body
    const reviewParams = {name: 'Famous place'}
    const reviewRes = await request(app).post(`/user/${user._id}/restaurant/${restaurant._id}/review`).send(reviewParams)
    t.is(reviewRes.status, 200)

    //fetch this review for the restaurant
    const restFetched = await request(app).get(`/restaurant/${restaurant._id}/json`)
    const reviewFetchedJSON = await request(app).get(`/restaurant/${restaurant._id}/reviews/json`)
    t.is(reviewFetchedJSON.status, 200)
    t.true(Array.isArray(reviewFetchedJSON.body),'Body should be an array')
    t.true(reviewFetchedJSON.body.length > 0)

    const reviewFetched = await request(app).get(`/restaurant/${restaurant._id}/reviews`)
    t.is(reviewFetched.status, 200)
})

test('Get menu for the restaurant', async t => {
    t.plan(4)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    //create menu
     const menuRes = await createMenu(restaurant, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)
    t.is(menuRes.status, 200)
    const menu = menuRes.body

    //fetch menu to check the id
    const menuFetchedJSON = await request(app).get(`/restaurant/${restaurant._id}/menu/json`) 
    t.is(menuFetchedJSON.status, 200)
    t.deepEqual(menuFetchedJSON.body._id, menu._id)

    const menuFetchedJSON1 = await request(app).get(`/restaurant/${restaurant._id}/menu`) 
    t.is(menuFetchedJSON1.status, 200)
})

test('Get menu for restaurant that doesnot have a menu', async t => {
    t.plan(1)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    //get menu for this restaurant
    const menuFetchedJSON = await request(app).get(`/restaurant/${restaurant._id}/menu`) 
    t.is(menuFetchedJSON.status, 404)
})

test('Update restaurant details', async t => {
    t.plan(2)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    const url = `/restaurant/${restaurant._id}/update`
    const update = {address: 'xxxx'}
    const restToUpdate = await request(app).post(url).send(update)
    t.is(restToUpdate.status, 200)

    const restResultJSON = await request(app).get(`/restaurant/${restaurant._id}/json`)
    t.deepEqual(restResultJSON.body.address, update.address)
})

test('Delete menu for restaurant', async t => {
    t.plan(6)
    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body

    //create menu
    const menuRes = await createMenu(restaurant, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)
    t.is(menuRes.status, 200)
    const menu = menuRes.body

    //fetch restaurant
    const restFetchedRes = await request(app).get(`/restaurant/${restaurant._id}/json`)
    t.is(restFetchedRes.status, 200)
    
    t.deepEqual(restFetchedRes.body.menu._id, menu._id)

    //delete menu
    const deleteMenuRes = await request(app).delete(`/restaurant/${restaurant._id}/menu`)
    t.is(deleteMenuRes.status, 200)
    t.is(deleteMenuRes.ok, true)

    //fetch this menu again
    const menuToFetchJSON = await request(app).get(`/restaurant/${restaurant._id}/menu/json`) 
    t.is(menuToFetchJSON.status, 404)
})
