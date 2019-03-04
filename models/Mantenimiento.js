const sequelize = require('sequelize');
const db = require('../config/db');
const Avion = require('./Avion');

const Mantenimiento = db.define('Mantenimiento', {
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
    FechaEntrada: {
        type: sequelize.DATE,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true
        }
    },
    FechaSalida: {
        type: sequelize.DATE,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Tipo: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Descripcion: {
        type: sequelize.TEXT,
        allowNull: false,

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

module.exports = Mantenimiento;