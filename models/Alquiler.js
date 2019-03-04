const sequelize = require('sequelize');
const db = require('../config/db');
const Proveedor = require('./Proveedor');
const Avion = require('./Avion');

const Alquiler = db.define('Alquiler', {
    IDProveedor: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
            model: Proveedor,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    IDAvion: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
            model: Avion,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    FechaSolicitud: {
        type: sequelize.DATE,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true
        }
    },
    FechaEntrega: {
        type: sequelize.DATE,
        allowNull: true,

        validate: {
            notEmpty: false
        }
    },
    FechaDevolucion: {
        type: sequelize.DATE,
        allowNull: true
    },
    MontoPagado: {
        type: sequelize.FLOAT,
        allowNull: true
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

module.exports = Alquiler;