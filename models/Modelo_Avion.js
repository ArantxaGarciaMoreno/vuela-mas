const sequelize = require('sequelize');
const db = require('../config/db');

const ModeloAvion = db.define('ModeloAvion', {

    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true
        }
    },
    PesoVacio: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    MaxCargaEquipaje: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantBanios: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    VelocidadMax: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantAsientosECO: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantAsientosPC: {
        type: sequelize.INTEGER,
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