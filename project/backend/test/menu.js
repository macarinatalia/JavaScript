import test from 'ava'
import request from 'supertest'
import app from "../app"

const menuToCreate = {
    food: [],
    price: []
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



async function setInfo(restToCreate, food, price, menuParams){

    const restaurant = (await request(app).post('/restaurant').send(restToCreate)).body
    const food_1 = (await request(app).post('/food').send(food[0])).body
    const food_2 = (await request(app).post('/food').send(food[1])).body

    menuParams.name = 'Menu ' + restaurant.name
    menuParams.restaurant = restaurant._id
    menuParams.food.push(food_1)
    menuParams.food.push(food_2)
    menuParams.price.push(price[0])
    menuParams.price.push(price[1])

    const menu = await request(app).post('/menu').send(menuParams)
    return menu
}

test('Create new menu', async t => {
    t.plan(1)
    const menuRes = await setInfo(restToCreate, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)
    t.is(menuRes.status, 200)
})

test('Fetch a menu', async t => {
    t.plan(3)
    const menu = (await setInfo(restToCreate, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)).body
    const menuFetchResJSON = await request(app).get(`/menu/${menu._id}/json`)
    t.is(menuFetchResJSON.status, 200)
    const menuFetched = menuFetchResJSON.body
    t.deepEqual(menuFetched._id, menu._id)

    const menuFetchRes = await request(app).get(`/menu/${menu._id}`)
    t.is(menuFetchRes.status, 200)
})

test('Delete a menu', async t => {
    t.plan(4)

    const menu = (await setInfo(restToCreate, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)).body
    const menuDeleteRes = await request(app).delete(`/menu/${menu._id}`)
    t.is(menuDeleteRes.status, 200)
    t.is(menuDeleteRes.ok, true)

    const menuToFetch = await request(app).get(`/menu/${menu._id}/json`)
    t.is(menuToFetch.status, 404)

    //get food of menu that doesnot exist
    const foodToFetch = await request(app).get(`/menu/${menu._id}/food/json`)
    t.is(foodToFetch.status, 404)
})


test('Get list of menus', async t => {
    t.plan(4)
    
    const menu = (await setInfo(restToCreate, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)).body
    
    const allMenus = await request(app).get('/menu/all')
    t.is(allMenus.status, 200)

    const allMenusJSON = (await request(app).get('/menu/all/json'))
    t.is(allMenusJSON.status, 200)
    t.true(Array.isArray(allMenusJSON.body),'Body should be an array')
    t.true(allMenusJSON.body.length > 0)

})

test('Get food of the menu', async t => {
    t.plan(3)
    
    const menu = (await setInfo(restToCreate, [foodToCreate_1, foodToCreate_2], ['7.3', '3.5'], menuToCreate)).body
    
    //get food of this menu
    const foodResJSON = await request(app).get(`/menu/${menu._id}/food/json`)
    t.is(foodResJSON.status, 200)
    t.true(Array.isArray(foodResJSON.body),'Body should be an array')
    t.true(foodResJSON.body.length > 0)

    //delete menu


})