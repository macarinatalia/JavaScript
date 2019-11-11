const BaseService = require('./base-service')
const VisitorModel = require('../models/visitor')

class VisitorService extends BaseService {
    constructor() {
        super(VisitorModel, `${__dirname}/../visitor-database.json`)
    }
}

module.exports = new VisitorService()
