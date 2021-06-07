'use strict';
module.exports = function(express)
{
    var router = express.Router();
    var AdminController = require('../Controllers/AdminController');
    router.post('/adminlogin',AdminController.adminLogin);
    router.post('/add-user',AdminController.addUser);
    router.get('/list-users',AdminController.listUsers);

    return router;
}