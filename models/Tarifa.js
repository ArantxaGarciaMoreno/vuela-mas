const sequelize = require('sequelize');
const db = require('../config/db');

const Tarifa = db.define('Tarifa', {

    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

        validate: {
            notEmpty: true
        }
    },
    Clase: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    PrecioBase: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantEquipaje: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    PesoEquipaje: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    FeeReserva: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    FeeEquipajeExtra: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    FeePorVueloNoAbordado: {
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

module.exports = Tarifa;