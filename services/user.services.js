const db = require('../infraestructure/database');

module.exports = {
    create: async (u) => {
        return await db.create('user', u);
    },
    findByEmail: async (email) => {
        return await db.findByEmail('user', email);
    }
}