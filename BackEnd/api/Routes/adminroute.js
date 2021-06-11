'use strict';
module.exports = function(express)
{
    var router = express.Router();
    var AdminController = require('../Controllers/AdminController');
    router.post('/adminlogin',AdminController.adminLogin);
    router.post('/add-user',AdminController.addUser);
    router.get('/list-users',AdminController.listUsers);
    router.get('/edit-user/:id',AdminController.editUser);
    router.post('/update-user',AdminController.updateUser);
    router.get('/delete-user/:id',AdminController.deleteUser);
    router.get('/deactivate-user/:id',AdminController.deactivateUser);
    router.get('/activate-user/:id',AdminController.activateUser);

    return router;
}