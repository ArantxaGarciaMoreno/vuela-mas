const sequelize = require('sequelize');
const db = require('../config/db');

const Aeropuerto = db.define('Aeropuerto', {
    CodigoIATA: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true
        }
    },
    Ciudad: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Pais: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    ZonaHoraria: {
        type: sequelize.FLOAT,
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
    },

}, {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Aeropuerto;