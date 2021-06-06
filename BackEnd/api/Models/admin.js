const mongoose = require('mongoose');

var AdminSchema = mongoose.Schema({
    email:String,
    password:String
});

mongoose.model('Admin',AdminSchema);