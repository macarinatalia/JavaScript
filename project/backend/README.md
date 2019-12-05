## Online food service

Online food service offers to the users to order food from a restaurant and to write a review.

### Business logic
- User can order food from different restaurants.
- User can search restaurant by poscal code.
- Restaurant can have only one menu
- Menu consists from food and prices
- User can write a review for the restaurant


### Models
- User
- Restaurant
- Order
- Menu
- Food
- Review


### Additional libraries
1. Parse, validate, manipulate, and display dates and times in JavaScript.
    - `npm install moment`
2.  Nice interpretation of prices in menu
    - `npm install currency-formatter`

    
### Start application

[localhost:3000](http://localhost:3000/)

RUN: `nodemon index.js`

### Interactions

Routes (URL's) that we need for website' pages to display, where `object`is name of the model, `id` is unique identifier that is given for each instance in the model.

#### Get
- `/` - the homepage 
- `/object/all` - list of all instances in object
- `/object/:id` - the detail information about specific instance with the given `:id` value


#### Create
- `/` - create new object with specified parameters
    -`axios.post('/user', {name:'Elsa', index: 10245}).then(console.log)`

#### Delete
- `/object/all` - delete all instances of object
    - ex.: `axios.delete('/order/all').then(console.log)`
- `/object/:id` - delete specific instance with the given `:id` for object
    - ex.: `axios.delete('/restaurant/:id').then(console.log)`

#### Update
- `object/:id/update` - updates information for object
    - `axios.post('/user/:id', {address: 'Corinthstrasse 6'}).then(console.log)`




### Complex interactions

#### Restaurant
1. Get all visitors for the restaurant
    - `http://localhost:3000/restaurant/:id/visitors`
2. Print menu for the restaurant
    - `http://localhost:3000/restaurant/:id/menu`
3. Create menu for the restaurant
    - restaurant can have only one menu
    - `axios.post('/restaurant/:id/menu',{food: [':id1', ':id2'], price: ['2.0', '3,0']}).then(console.log)`
4. Get reviews for the restaurant
    - `http://localhost:3000/restaurant/:id/reviews`
5. Delete menu for the restaurant
    - `axios.delete('/restaurant/:id/menu').then(console.log)`
6. Get list of restaurants located in specified postalcode
    - `http://localhost:3000/restaurant/postal/:postalcode` 

#### User
1. User makes an order in specific restaurant (create new order)
    - `axios.post('/user/:userId/restaurant/:restId/order',{ food: [':id1', ':id2', ...] }).then(console.log)`
2. User adds review to restaurant
    - `axios.post('/user/:id/restaurant/:id/review',{name: 'cool restaurant'}).then(console.log)`
3. Get reviews for the user
    - `http://localhost:3000/user/:id/reviews`
4. Get list of restaurants located in user's postalcode
    - `http://localhost:3000/user/5dd1412c51db4776931cd848/restaurants` 
5. User cancel an order 
    - `axios.post('/:userId/order/:orderId/cancel').then(console.log)`


#### Reviews
1. Get all reviews for object (restaurant, user)
    - `http://localhost:3000/user/:id/reviews`

#### Order
1. Get orders searched by status
    - `http://localhost:3000/order/status/open`

### Testing

Test are added for the routes.
RUN:  `npm run test`

To see the coverage of written tests must run `npm run test-coverage`


### TODO

### backend
1. User can make order only from the food from menu of the restaurant
2. User sign in/ log in/ log out 
3. Make a delete all function 

### frontend
1. search restaurants by index, if enter index two times, it gives an error
