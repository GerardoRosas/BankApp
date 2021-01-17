//Configurar y conectar a la base de datos
const Sequelize = require('sequelize');


module.exports = new Sequelize('endcombankapp', 'root', 'root', {
    host: 'localhost',
    port: '8889',
    dialect: 'mysql',
    define:{
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: 1
})

