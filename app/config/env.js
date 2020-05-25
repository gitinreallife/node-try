const env = {
    database: 'gringgo_swai',
    username: 'root',
    password: '30121994',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    port: 3005

}
module.exports = env