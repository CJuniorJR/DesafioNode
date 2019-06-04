const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const uuid = require('uuid');

db.defaults({ user: [] }).write();

let dataAtual = () => {  
    let calendar = new Date();
    return `${calendar.getDate()}/${calendar.getMonth()}/${calendar.getFullYear()}`+ 
    ` ${calendar.getHours()}:${calendar.getMinutes()}:${calendar.getSeconds()}`
}

module.exports = {
    create: (obj,body) => {
        body.id = uuid();
        body.data_criacao = dataAtual();
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