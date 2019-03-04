const sequelize = require('sequelize');
const db = require('../config/db');
const Empleado = require('./Empleado');
const Vuelo = require('./Vuelo');

const Tripulacion = db.define('Tripulacion', {
    IDEmpleado: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
            model: Empleado,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    IDVueloTrabajado: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
            model: Vuelo,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    Activo: {
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    }
},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Tripulacion;