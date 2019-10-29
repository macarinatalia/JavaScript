 const Person = require('./person.js')
 const Meetup = require('./meetup.js') 
 const Chalk = require('chalk')             //'./node_modules/chalk')
 const Database = require('./database')

 const mert =  new Person('Mert', 34)
 const armagan = new Person('Ármagan', 35)

 //console.log(Chalk.blue.bgRed.bold('Hello'))

 //mert.greet(armagan)

 const wtmb = new Meetup('WTM Berlin')
 armagan.attend(wtmb)
 mert.attend(wtmb)

 //wtmb.printAttendeeNames()




 Database.save('meetup.json',wtmb)
 Database.save('person.json',mert.name)

 const loadedFile = Database.load('meetup.json')
 console.log(loadedFile.name)

 
 //const people = [mert, armagan]
 //Database.save('person.json',people)
