var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    textReview:{
        type: String,
        required: true     
     },
    rating:{
        type: Number,
        required: true     
     },
    book:{
        type: Schema.Types.ObjectId,
        ref: 'Book'     
     }, 
     user:{
        type: Schema.Types.ObjectId,
        ref: 'User'     
     }
});


module.exports = mongoose.model('Review', ReviewSchema);