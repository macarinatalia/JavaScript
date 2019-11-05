const Restaurant = require('./models/restaurant')
const Visitor = require('./models/visitor')
const Menu = require('./models/menu')
const RestaurantService = require('./services/restaurant-service')
const VisitorService = require('./services/visitor-service')

async function main(){

  //add restaurants
  const mcdonalds = new Restaurant('McDonalds','Alexanderpl.8')
  const burgerKing = new Restaurant('Burger King', 'EastSideMall')
  
  //add visitors
  const john = new Visitor('John')
  const alex = new Visitor('Alex')
  const mary = new Visitor('Mary')
  const anna = new Visitor('Anna')
  john.visit(mcdonalds)
  mary.visit(mcdonalds)
  alex.visit(mcdonalds)
  anna.visit(burgerKing)

  mcdonalds.report()
  burgerKing.report()

  //fill database
  await RestaurantService.add(mcdonalds)
  await RestaurantService.add(burgerKing)
  await VisitorService.add(john)
  await VisitorService.add(mary)
  await VisitorService.add(alex)
  await VisitorService.add(anna)

  //print all restaurants and ids
  console.log('\n--- All restaurants ---')
  var restaurants = await RestaurantService.findAll()
  restaurants.forEach(restaurant => console.log(restaurant.name, ' ', restaurant.id))

  //print greetings of each restaurant
  restaurants.forEach(restaurant => restaurant.greetAllVisitors())

  //delete restaurant with id = 2
  console.log('\n--- All restaurants after deletion id = 2 ---')
  await RestaurantService.del(2)
  restaurants = await RestaurantService.findAll()
  restaurants.forEach(restaurant => console.log(restaurant.name, ' ', restaurant.id))
  

  //print visitor for restaurants with id = 1 if exists
  console.log('\n--- Print visitors for restaurant with id = 1 ---')
  const restaurant = await RestaurantService.find(1)
  if (restaurant == undefined || restaurant == null) console.log('no such restaurant')
  else restaurant.printVisitors()
  

  //print all visitors
  console.log('\n--- All visitors ---')
  const visitors = await VisitorService.findAll()
  visitors.forEach(visitor => console.log(visitor.name))

  //delete all data
  // RestaurantService.delAll()
  // VisitorService.delAll()
}


main()
  