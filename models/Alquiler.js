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
    }
},
{
    timestamps: false,
    freezeTableName: true
});

module.exports = Alquiler;