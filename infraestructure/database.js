const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const uuid = require('uuid');

db.defaults({ user: [] }).write();

module.exports = {
    create: (obj,body) => {
        body.id = uuid();
        db
        .get(obj)
        .push(body)
        .write();
    },
    findByEmail: (obj,body) => {
        db
        .get(obj)
        .find({ email: body })
        .value();
    }
}