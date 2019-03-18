const sequelize = require('sequelize');
const db = require('../config/db');
const Vuelo = require('./Vuelo');
const Aeropuerto = require('./Aeropuerto');

const Desvio = db.define('Desvio', {
        IDVuelo: {
            type: sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,

            validate: {
                notEmpty: true
            },

            references: {
                model: Vuelo,
                key: 'ID'
            }
        },
        Destino: {
            type: sequelize.STRING,
            allowNull: false,
            
            validate: {
                notEmpty: true
            },

            references: {
                model: Aeropuerto,
                key: 'CodigoIATA'
            }
        },
        Llegada: {
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
                notEmpty: true
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Desvio