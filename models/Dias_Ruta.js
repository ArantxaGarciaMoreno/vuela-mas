const sequelize = require('sequelize');
const db = require('../config/db');
const Ruta = require('./Ruta');

const Dias_Ruta = db.define('Dias_Ruta', {
    IDRuta: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
            model: Ruta,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    DiaSemana: {
        type: sequelize.STRING,
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

module.exports = Dias_Ruta;