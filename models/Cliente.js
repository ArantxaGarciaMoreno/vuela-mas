const sequelize = require('sequelize');
const db = require('../config/db');

const Cliente = db.define('Cliente', {

    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

        validate: {
            notEmpty: true
        }
    },
    Pasaporte: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,

        validate: {
            notEmpty: true
        }
    },
    Nombre: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Apellido: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Nacionalidad: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    FechaNacimiento: {
        type: sequelize.DATEONLY,
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

module.exports = Cliente;