const db = require('../infraestructure/database');

module.exports = {
    create: (u) => {
        db.create('user', u);
        
        return true;
    },
    findByEmail: (email) => {
        return db.findByEmail('user', email);
    }
}