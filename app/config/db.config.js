const env = require('./env.js')
const Sequelize = require('sequelize')
const ISequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
})
const uuid = require('uuid')
const db = {}
db.Sequelize = Sequelize
db.ISequelize = ISequelize
db.uuid = uuid

db.user = require('../model/user.model.js')(ISequelize, Sequelize, uuid)
db.bruh = require('../model/bruh.model.js')(ISequelize, Sequelize, uuid)
module.exports = db