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

//Sugerencia de clave para asociar con tabla de Pasaje. (Ej.: mostrar cuál cliente corresponde a cada pasaje)
    Reserva: {
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