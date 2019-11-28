const fs = require('fs')
const Flatted = require('flatted/cjs');

module.exports = class Service {
 
  async findAll() {
    return this.model.find()
  }

  async add(item) {
    return this.model.create(item)
  }

  async  del(itemId) {
    return this.model.deleteOne({ _id: itemId})
  }

  // async  delAll() {
  //   return this.model.deleteMany()
  // }

  async find(itemId) {
    return this.model.findById(itemId)
  }

  async findByParameter(param) {
    return this.model.find(param)
  }

  async update(itemId, itemBody){
    return this.model.updateOne({ _id: itemId }, itemBody, { new : true})
  }
  
}
