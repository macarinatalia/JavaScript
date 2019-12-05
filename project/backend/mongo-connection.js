const mongoose = require('mongoose')

async function main(){
    mongoose.da
    await mongoose.connect('mongodb://localhost/onlinefoodservice', { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('mongoose connected')
}

main()
