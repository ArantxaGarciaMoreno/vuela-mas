const sequelize = require('sequelize');
const db = require('../config/db');
const Cliente = require('./Cliente');

const Telefonos_Clientes = db.define('Telefonos_Clientes', {
    IDCliente: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
            model: Cliente,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    Telefono: {
        type: sequelize.BIGINT,
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

module.exports = Telefonos_Clientes;