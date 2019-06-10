const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const uuid = require('uuid');
const moment = require('moment');
const lodash = require('lodash');

db.defaults({ user: [] }).write();

module.exports = {
    create: (obj,body) => {
        let defaults = {
            id: uuid(),
            data_criacao: moment().format(),
            data_atualizacao: moment().format()
        };

        let entity = Object.assign(body, defaults);

        db.get(obj).push(entity).write();
        
        lodash.omit(entity, 'senha');
        
        return entity;
    },
    find: (obj, criteria) => {
        return db.get(obj).find(criteria).value();
    },
    update: (obj, criteria, data) => {
        return db.get(obj).find(criteria).assign(data).value();
    }
};