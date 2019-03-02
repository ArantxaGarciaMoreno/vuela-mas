const sequelize = require('sequelize');
const db = require('../config/db');
const Aeropuerto = require('../models/Aeropuerto');

const VueloProgramado = db.define('VueloProgramado', {

    CodigoVuelo: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    Origen: {
        type: sequelize.STRING,
        allowNull: false,
        foreignKey: true,

        validate: {
            notEmpty: true
        },
        references: {
            model: Aeropuerto,
            key: 'CodigoIATA',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    Destino: {
        type: sequelize.STRING,
        allowNull: false,
        foreignKey: true,

        validate: {
            notEmpty: true
        },
        references: {
            model: Aeropuerto,
            key: 'CodigoIATA',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    Dia: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Hora: {
        type: sequelize.TIME,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Duracion: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true,
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

module.exports = VueloProgramado;