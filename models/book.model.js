var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title:{
        type: String,
        required: true     
     },
    ISBN:{
        type: Number,
        required: true,
        unique: true 
      },
    author:{
        type: String,
        required: true     
     },
     rating:{
        type: Number,
        required: true     
     },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'     
     },
     reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review' 
     }]
});


module.exports = mongoose.model('Book', BookSchema);