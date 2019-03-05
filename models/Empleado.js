const sequelize = require('sequelize');
const db = require('../config/db');

const Empleado = db.define('Empleado', {
    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

        validate: {
            notEmpty: true
        }
    },
    Pasaporte: {
        type: sequelize.STRING,
        allowNull: true,
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
    Cargo: {
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

module.exports = Empleado;