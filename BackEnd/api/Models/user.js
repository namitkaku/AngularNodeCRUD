const  mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    address:String
});

mongoose.model('User',userSchema);