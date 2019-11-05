const fs = require('fs')

const save = function(filename, data) {
    fs.writeFile(filename,JSON.stringify(data),function(err){
      if(err)
        console.log('there is a write error', err)
        handler(err)
        return
    })
   // console.log('File ' + filename + ' was saved')
}

const load = function(filename, handler) {
  fs.readFile(__dirname + '/' + filename, 'utf8', (err, file) => {
      if (err) {
        console.log('there is a read error', err)
        handler(err)
        return
      }
  
      handler(null, JSON.parse(file));
    })
  }

module.exports = { save, load }