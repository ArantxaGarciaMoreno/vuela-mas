const sequelize = require('sequelize');
const db = require('../config/db');
const Cliente = require('./Cliente');
const Tarifa = require('./Tarifa');
const Vuelo = require('./Vuelo');

const Pasaje = db.define('Pasaje', {

    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    IDPasajero: {
        type: sequelize.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',

        references: {
            model: Cliente,
            key: 'ID'
        },

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    IDVueloReservado: {
        type: sequelize.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',

        references: {
            model: Vuelo,
            key: 'ID'
        },

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    IDTarifa: {
        type: sequelize.INTEGER,
        allowNull: false,

        references: {
            model: Tarifa,
            key: 'ID'
        },

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    IDComprador: {
        type: sequelize.INTEGER,
        allowNull: false,

        references: {
            model: Cliente,
            key: 'ID'
        },

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    IDVueloAbordado: {
        type: sequelize.INTEGER,
        allowNull: true,

        references: {
            model: Vuelo,
            key: 'ID'
        },
        
        validate: {
            isNumeric: true,
            notEmpty: false
        }
    },
    Asiento: {
        type: sequelize.INTEGER,
        allowNull: true,

        validate: {
            isNumeric: true,
            notEmpty: false
        }
    },
    Estado: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    FechaReserva: {
        type: sequelize.DATE,
        allowNull: false,

        validate: {
            isDate: true,
            notEmpty: true
        }
    },
    MetodoPago: {
        type: sequelize.STRING,
        allowNull: false,

        validate:{
            isAlpha: true,
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