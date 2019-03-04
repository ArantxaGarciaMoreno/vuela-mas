const sequelize = require('sequelize');
const db = require('../config/db');
const Aeropuerto = require('./Aeropuerto');

const Pista = db.define('Pista',{
    CodigoIATA: {
        type: sequelize.STRING,
        primaryKey: true,
        allowNull: false,

        references: {
            model: Aeropuerto,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    Distancia: {
        type: sequelize.FLOAT,
        primaryKey: true,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    }
},
{
    timestamps: false,
    freezeTableName: true 
});

module.exports = Pista;