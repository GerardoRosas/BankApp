const  { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Movimiento = db.define('movimientos', {
    id:{
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    movementCode:{
        type: DataTypes.STRING(4),
        allowNull: false,
        defaultValue: 'M001'
    },
    description:{
        type: Sequelize.STRING(4),
        defaultValue: '',
    },
    amount:{
        type: Sequelize.NUMBER(),

    },
    account:{
        type: Sequelize.STRING(11),
        allowNull: false,
    },
    createDate:{
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false,
    }
})

module.exports = Movimiento;