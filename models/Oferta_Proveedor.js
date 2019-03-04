const sequelize = require('sequelize');
const db = require('../config/db');
const Proveedor = require('./Proveedor');
const Modelo_Avion = require('./Modelo_Avion');

const Oferta_Proveedor = db.define('Oferta_Proveedor', {
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
    IDModeloAvion: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
            model: Modelo_Avion,
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

module.exports = Oferta_Proveedor;