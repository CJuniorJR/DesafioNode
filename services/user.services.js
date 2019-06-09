const db = require('../infraestructure/database');
const moment = require('moment');
const uuid = require('uuid');
const utils = require('../utils/utils');

module.exports = {
    create: (u) => {

        let user = Object.assign(u, {
            ultimo_login: moment().format(),
            token: uuid()
        });
        user.senha = utils.encrypt(user.senha);
    
        return db.create('user', user);
    },
    findByEmail: (email) => {
        return db.find('user', { email: email });
    },
    get: (id) => {
        return db.find('user', { id: id });
    },
    signinUpdate: (id) => {
        return db.update('user', { id: id }, { ultimo_login: moment().format() });
    }
};