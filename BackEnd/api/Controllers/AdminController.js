'use strict';
var mongoose = require('mongoose');

var Admin = mongoose.model('Admin');
var User = mongoose.model('User');

module.exports = {
    adminLogin:adminLogin,
    addUser:addUser,
    listUsers:listUsers,
    editUser:editUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    deactivateUser:deactivateUser,
    activateUser:activateUser
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

function addUser(req,res)
{
  var userData = {
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      address:req.body.address,
      status:1
  };

  User.countDocuments({email:req.body.email}).then(count => {
      if(count > 0)
      {
        return res.json({
            'status': 300,
            'message' : `${req.body.email}  already exists. Please try with different email id`
        })
      }
      else
      {
        User.insertMany(userData).then(save => {
            if(save)
            {
              return res.json({
                  'status': 200,
                  'message' : `User with name  ${req.body.name}  added Successfully!`,
              })
            }
            else
            {
              return res.json({
                  'status': 300,
                  'message' : 'Fail to add User',
              })
            }
        })
      }
  })
}

function listUsers(req,res)
{
    User.find().then(data => {
        if(data)
        {
            return res.json({
                'status': 200,
                'message' : `Data fetched Successfully`,
                'data': data
            })
        }
        else{
            return res.json({
                'status': 300,
                'message' : `Data not data found`,
            })
        }
    })
}

function editUser(req,res)
{
    User.find({_id:req.params.id}).then(data => {
        if(data)
        {
            return res.json({
                'status': 200,
                'message' : `Data fetched Successfully`,
                'data': data
            })
        }
        else{
            return res.json({
                'status': 300,
                'message' : `Data not data found`,
            })
        }
    })
}

function updateUser(req,res)
{
   User.updateOne(
       {_id:req.body._id},
       {$set:{name:req.body.name,phone:req.body.phone,address:req.body.address}},).then(update => {
           if(update)
           {
            return res.json({
                'status' : 200,
                'message' : 'Record Updated Successfully!'
            })
           }
           else
           {
            return res.json({
                'status' : 300,
                'message' : 'Fail to update Record!'
            })
           }
       }) 
  
}

function deleteUser(req,res)
{
    User.deleteOne({_id:req.params.id}).then(ifdelete =>{
        if(ifdelete)
        { 
            return res.json({
                'status' : 200,
                'message' : 'Record Deleted Successfully!'
            })
        }
        else
        {
            return res.json({
                'status' : 300,
                'message' : 'Fail to delete record!'
            })
        }
    })
}

function deactivateUser(req,res)
{
  User.find({_id:req.params.id}).then(iffind=>{
      if(iffind)
      {
          User.updateOne(
              {_id:req.params.id},
              {$set : {status:0}}).then(update=>{
                  if(update)
                  {
                    return res.json({
                        'status' : 200,
                        'message' : 'Record Deactivated Successfully!'
                    })
                  }
                  else{
                    return res.json({
                        'status' : 300,
                        'message' : 'Fail to deactivate Record!'
                    })
                  }
              })
      }
  })
}

function activateUser(req,res)
{
  User.find({_id:req.params.id}).then(iffind=>{
      if(iffind)
      {
          User.updateOne(
              {_id:req.params.id},
              {$set : {status:1}}).then(update=>{
                  if(update)
                  {
                    return res.json({
                        'status' : 200,
                        'message' : 'Record Activated Successfully!'
                    })
                  }
                  else{
                    return res.json({
                        'status' : 300,
                        'message' : 'Fail to activate Record!'
                    })
                  }
              })
      }
  })
}