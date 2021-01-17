const {Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Usuario = db.define('usuarios', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        validate:{
            min:{
                args: [3, 50]
            }
        },
        allowNull: false
    },
    mail:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    account:{
        type: DataTypes.STRING,
        allowNull: false,
        // validate:{
        //     max:{
        //         args: [0, 11]
        //     }
        // }
    },
    balance:{
        type: DataTypes.INTEGER,
        defaultValue: 1000,
    }
})

module.exports = Usuario;