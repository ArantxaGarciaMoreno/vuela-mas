const sequelize = require('sequelize');
const db = require('../config/db');

const Cliente = db.define('Cliente', {

    Nombre: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },

    Apellido: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },

    CI: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    }

});

module.exports = Cliente;