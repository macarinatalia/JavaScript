const Database = require('./database')
const functionsDB = require('./functionsDB')
functionsDB.loadData(Database)

const loadedRestaurant = Database.load('restaurant.json')
console.log(loadedRestaurant.name)


