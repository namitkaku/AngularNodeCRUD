'use strict';
var mongoose = require('mongoose');

var Admin = mongoose.model('Admin');
module.exports = {
    adminLogin:adminLogin
}

function adminLogin(req,res)
{
    Admin.countDocuments({email:req.body.email,password:req.body.password}).then(count => {
        if(count > 0)
        {
            return res.json({
                'status': 200,
                'message' : 'Successfully Loggedin!',
                'data' : req.body.email
            })
        }
        else
        {
            return res.json({
                'status': 300,
                'message' : 'Invalid Credentials'
            })
        }
    })
    
}