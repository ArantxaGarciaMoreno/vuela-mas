const sequelize = require('sequelize');
const db = require('../config/db');


const Proveedor = db.define('Proveedor', {
    ID: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true
        }
    },
    Nombre: {
        type: sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex',

        validate: {
            notEmpty: true
        }
    },
    Ciudad: {
        type: sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex',

        validate: {
            notEmpty: true
        }
    },
    Pais: {
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

module.exports = Proveedor;