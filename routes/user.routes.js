const userController = require('../controllers/user.controller');

let routes = [{
    method: 'POST',
    path: '/user',
    handler: userController.create
}]

module.exports = routes;