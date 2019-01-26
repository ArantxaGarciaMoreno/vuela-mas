const sequelize = require('sequelize');
const db = require('../config/db');

const Pasaje = db.define('Pasaje', {
    Numero: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    Reserva: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    Pasajero: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            isNumeric: true,
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
    },

}, {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Pasaje;