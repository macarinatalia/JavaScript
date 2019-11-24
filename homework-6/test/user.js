import test from 'ava'
import request from 'supertest'
import app from "../app"

// test('Create new user', async t => {
//     t.plan(4)
//     const newUser = {
//         name: 'Alice',
//         address: 'Warschauerstr. 66',
//         index: 10243,
//         orders: []
//     }

//     const res = await request(app).post('/user').send(newUser)

//     t.is(res.status, 200)
//     t.is(res.body.name, newUser.name)
//     t.is(res.body.address, newUser.address)
//     t.is(res.body.index, newUser.index)
    
// })

// test('Fetch the user', async t => {
//     t.plan(2)
//     const newUser = {
//         name: 'Boris',
//         address: 'Samaritenstr. 61',
//         index: 10247,
//         orders: []
//     }

//     const user = (await request(app).post('/user').send(newUser)).body
//     const fetchRes = await request(app).get(`/user/${user._id}/json`)

//     t.is(fetchRes.status, 200)
//     const userFetched = fetchRes.body
//     t.deepEqual(userFetched, user)
    
// })

// test('Delete a user', async t => {
//     t.plan(3)

//     const newUser = {
//         name: 'Anna',
//         address: 'Bossestr. 7',
//         index: 10245,
//         orders: []
//     }

//     const user = (await request(app).post('/user').send(newUser)).body
//     const deleteRes = await request(app).delete(`/user/${user._id}`)
//     t.is(deleteRes.status, 200)
//     t.is(deleteRes.ok, true)

//     const userToFetch = await request(app).get(`/user/${user._id}/json`)
//     t.is(userToFetch.status, 404)
// })

// test('Get list of users', async t => {
//     t.plan(4)
//     const newUser = {
//         name: 'Inna',
//         address: 'Schoenebergstr. 17',
//         index: 10456,
//         orders: []
//     }

//     const user = (await request(app).post('/user').send(newUser)).body

//     const allUsers = await request(app).get('/user/all')
//     t.is(allUsers.status, 200)

//     const allUsersJSON = (await request(app).get('/user/all/json'))
//     t.is(allUsersJSON.status, 200)
//     t.true(Array.isArray(allUsersJSON.body),'Body should be an array')
//     t.true(allUsersJSON.body.length > 0)

// })

// test('Get list of restaurants located near user (search by index)' , async t => {
    
//     t.plan(3)
//     const newUser = {name: 'Anna', address: 'Bossestr. 7', index: 10245}
//     const newRest = {name: 'Pi Pa Sa Pikante', address: 'Revaler Straße 8', index: 10245, reviews: []}

//     const user = (await request(app).post('/user').send(newUser)).body
//     const restaurant = (await request(app).post('/restaurant').send(newRest)).body

//     const allRestaurantsForUserJSON = (await request(app).get(`/user/${user._id}/restaurants/json`))
//     t.is(allRestaurantsForUserJSON.status, 200)
//     t.true(Array.isArray(allRestaurantsForUserJSON.body),'Body should be an array')
//     t.true(allRestaurantsForUserJSON.body.length > 0)
// })

// test('Get list of reviews for user', async t =>{

// })

test('Make review to a restaurant', async t => {
    t.plan(1)
    const newUser = {name: 'Inna', address: 'Schoenebergstr. 17', index: 10456}
    const newRest = {name: 'Pi Pa Sa Pikante', address: 'Revaler Straße 8', index: 10245, reviews: []}

    const user = (await request(app).post('/user').send(newUser)).body
    const restaurant = (await request(app).post('/restaurant').send(newRest)).body

    //write a review
    // const reviewRes = await request(app)
    //         .post(`/user/${user._id}/restaurant/${restaurant._id}/review`)
    //         .send({name: 'Very nice place'})

    t.log('write a review')
    const url = `/user/${user._id}/restaurant/${restaurant._id}/review`
    const review = { name: 'Very nice place' }
    const reviewRes = await request(app).post(url, review)


    
    t.log(reviewRes)
    t.is(reviewRes.status, 200)


    // const review = reviewRes.body

    // const fetchReview = await request(app).get(`/review/${review._id}/json`)
    // console.log(fetchReview.body)
    // t.is(fetchReview.status, 200)
    // t.deepEqual(fetchReview.body.user, user._id)
    // t.deepEqual(fetchReview.body.restaurant, restaurant._id)

})

// test('User makes an order in specific restaurant', async t => {
//     t.plan(1)
//     const newUser = {name: 'Anna', address: 'Bossestr. 7', index: 10245}
//     const newRest = {name: 'Pi Pa Sa Pikante', address: 'Revaler Straße 8', index: 10245, reviews: []}

//     const user = (await request(app).post('/user').send(newUser)).body
//     const restaurant = (await request(app).post('/restaurant').send(newRest)).body

//     const newFood = {name: 'Chips', ingridietns: 'potatoes, oil'}
//     const food = (await request(app).post('/food').send(newFood)).body

//     const orderRes = await request(app)
//         .post(`/user/${user._id}/restaurant/${restaurant._id}/order`)
//         .send({food: [food._id]})
    
//     t.is(orderRes.status, 200)

// })