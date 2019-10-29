const Database = require('./database')
const functionsDB = require('./functionsDB')
//functionsDB.fillDB(Database)

const loadedRestaurant = Database.load('restaurant.json')
console.log(loadedRestaurant.name)

