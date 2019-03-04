const sequelize = require('sequelize');
const db = require('../config/db');

const Avion = db.define('Avion', {

    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true
        }
    },
    IDModeloAvion: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Fabricante: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Estado: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    hasInternet: {
        type: sequelize.TINYINT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantTV: {
        type: sequelize.TINYINT,
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

module.exports = Avion;