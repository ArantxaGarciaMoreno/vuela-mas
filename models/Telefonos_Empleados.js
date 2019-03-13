const sequelize = require('sequelize');
const db = require('../config/db');
const Empleado = require('./Empleado');

const Telefonos_Empleados = db.define('Telefonos_Empleados', {
    IDEmpleado: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
            model: Empleado,
            key: 'ID'
        },

        validate: {
            notEmpty: true
        }
    },
    Telefono: {
        type: sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,

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

module.exports = Telefonos_Empleados;