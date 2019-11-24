const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://localhost/onlinefoodservice1', { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('mongoose connected')
}

main()
