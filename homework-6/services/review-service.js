const BaseService = require('./base-service')
const ReviewModel = require('../models/review')

class ReviewService extends BaseService {
    model = ReviewModel

    async createReview(restaurant, user, rev){
        rev.restaurant = restaurant
        rev.user = user
        rev.date = new Date().toLocaleString()
        const review = await this.add(rev)
        //restaurant.reviews.push(review)
        //await restaurant.save()

        return review
    }

    async getAllReviews(id, objectName, service){
        const reviews = await this.findAll()
        const result =  await this.findByParameter( { [objectName]: { _id : id }} )
        return result
    }
}

// animalSchema.methods.findSimilarTypes = function(cb) {
//     return this.model('Animal').find({ type: this.type }, cb);
//   };

module.exports = new ReviewService()
