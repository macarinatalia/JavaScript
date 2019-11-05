function loadData(database){
    const Visitor = require('./visitor')
    const Restaurant = require('./restaurant')
    const Menu = require('./menu')

    const mcdonalds = new Restaurant('McDonalds','Alexanderpl.8')
    const mcdonaldsMenu = new Menu('McDonalds Menu')
    const john = new Visitor('John')
    const alex = new Visitor('Alex')
    const mary = new Visitor('Mary')

    mcdonaldsMenu.addFoodToMenu('burger',2)
    mcdonaldsMenu.addFoodToMenu('cola',1)
    mcdonaldsMenu.addFoodToMenu('chips',3)

    mcdonaldsMenu.printMenu()

    john.visit(mcdonalds)
    mary.visit(mcdonalds)
    alex.visit(mcdonalds)

    mcdonalds.createOrder(john, ['burger','cola'])
    mcdonalds.createOrder(alex, ['chips'])
    mcdonalds.createOrder(mary, ['burger','cola','chips'])

    //mcdonalds.printOrder(mary)
    //alex.leaveRestaurant(mcdonalds)

    const visitors = [ john, alex, mary ]
    //const restaurants = [mcdonalds]
    //const menus = [mcdonaldsMenu]

    database.save('homework-2-async/restaurant.json', mcdonalds)
    database.save('homework-2-async/visitor.json', visitors)
    database.save('homework-2-async/menu.json', mcdonaldsMenu)

}

module.exports = { loadData }