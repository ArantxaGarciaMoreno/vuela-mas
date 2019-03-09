const sequelize = require('sequelize');
const db = require('../config/db');
const Cliente = require('./Cliente');
const Empleado = require('./Empleado');

const Telefonos = db.define('Telefonos', {
    IDPersona: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,

        references: {
            model: Cliente,
            key: 'Pasaporte'
        },

        validate: {
            notEmpty: true
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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