const sequelize = require('sequelize');
const db = require('../config/db');

const Modelo_Avion = db.define('Modelo_Avion', {
    ID: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

        validate: {
            notEmpty: true
        }
    },
    Nombre: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,

        validate: {
            notEmpty: true
        }
    },
    PesoVacio: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    MaxCargaEquipaje: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantBanios: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    VelocidadMax: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantAsientosECO: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantAsientosPC: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    DistDespegueCargaMax: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    VelocidadCrucero: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    PesoMax: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    TipoCombustible: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantSalidasE: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    CantCombustible: {
        type: sequelize.FLOAT,
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

module.exports = Modelo_Avion;
