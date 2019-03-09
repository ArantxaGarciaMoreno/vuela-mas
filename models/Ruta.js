const sequelize = require('sequelize');
const db = require('../config/db');
const Avion = require('./Avion');
const AeropuertoO = require('./Aeropuerto');
const AeropuertoD = require('./Aeropuerto');

const Ruta = db.define('Ruta', {

    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

        validate: {
            notEmpty: true
        }
    },
    CodigoIATAOrigen: {
        type: sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex',
        
        references: {
            model: AeropuertoO,
            key: 'CodigoIATA'
        },
        
        validate: {
            notEmpty: true
        }
    },
    CodigoIATADestino: {
        type: sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex',

        references: {
            model: AeropuertoD,
            key: 'CodigoIATA'
        },
        
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

module.exports = Ruta;