const sequelize = require('sequelize');
const db = require('../config/db');
const Cliente = require('./Cliente');
const Empleado = require('./Empleado');

const Telefonos = db.define('Telefonos', {
    IDPersona: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
            model: { Cliente, Empleado },
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    Telefono: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

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

module.exports = Telefonos;