'use strict';
module.exports = function(express)
{
    var router = express.Router();
    var AdminController = require('../Controllers/AdminController');
    router.post('/adminlogin',AdminController.adminLogin);

    return router;
}