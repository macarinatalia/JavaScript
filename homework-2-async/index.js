const Database = require('./database')
const Restaurant = require('./restaurant')
const Visitor = require('./visitor')
const Menu = require('./menu')

const functionsDB = require('./functionsDB')
functionsDB.loadData(Database)

// const loadedRestaurant = Database.load('restaurant.json')
// console.log(loadedRestaurant.name)


const doAfterLoadingTheDatabase = (err, loadedFile) => {
    if (err) {
      console.log('Error with loadinng database', err)
      return
    }
  
    const restA = Restaurant.create(loadedFile)
    const anna = new Visitor('Anna')
    anna.visit(restA)
    restA.printVisitors()
  }
  
  Database.load('restaurant.json', doAfterLoadingTheDatabase)
  
  