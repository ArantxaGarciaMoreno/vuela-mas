const sequelize = require('sequelize');
const db = require('../config/db');
const Ruta = require('./Ruta');
const Avion = require('./Avion');
const Aeropuerto = require('./Aeropuerto');

const Vuelo = db.define('Vuelo', {
    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

        validate: {
            notEmpty: true
        }
    },
    IDRuta: {
        type: sequelize.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',

        references: {
            model: Ruta,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    Fecha: {
        type: sequelize.DATEONLY,
        allowNull: false,
        unique: 'compositeIndex',

        validate: {
            notEmpty: true
        }
    },
    IDAvion: {
        type: sequelize.INTEGER,
        allowNull: false,

        references: {
            model: Avion,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    CodigoIATADestino: {
        type: sequelize.STRING,
        allowNull: false,

        references: {
            model: Aeropuerto,
            key: 'CodigoIATA'
        },

        validate: {
            notEmpty: true
        }
    },
    HoraSalida: {
        type: sequelize.TIME,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    HoraLlegada: {
        type: sequelize.TIME,
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

module.exports = Vuelo;