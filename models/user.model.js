var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        trim: true  
     },
    password:{
        type: String,
        required: true     
     },
});


module.exports = mongoose.model('User', UserSchema);