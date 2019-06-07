const userController = require('../controllers/user.controller');

let routes = [{
    method: 'POST',
    path: '/user',
    handler: userController.create
},
{
    method: 'POST',
    path: '/sign-in',
    handler: userController.signin
},
{
    method: 'GET',
    path: '/user/{id}',
    handler: userController.get
}];

module.exports = routes;