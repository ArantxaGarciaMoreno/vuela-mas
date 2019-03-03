const sequelize = require('sequelize');
const db = require('../config/db');
const Aeropuerto = require('../models/Aeropuerto');

const controller = {};

//Obtiene todos los aeropuertos
controller.getAeropuertos = async function (callback) {
    try {
        let response = await Aeropuerto.findAll({
            where: {
                Activo: 1
            },
            attributes: ['CodigoIATA','Ciudad','Pais',[sequelize.fn('concat','UTC',sequelize.col('ZonaHoraria'),':00'),'ZonaHoraria']] 
        });
        let aeropuertos = response.map(result => result.dataValues);
        console.log(aeropuertos);
        callback(aeropuertos, null);
    } catch (error) {
        callback(null, error);
    }
}

//Desactiva un aeropuerto (Activo = 0)
controller.deleteAeropuerto = async function (CodigoIATA, callback) {
    try {
        let response = await Aeropuerto.update({
            Activo: 0
        }, {
                where: {
                    CodigoIATA
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Crea un aeropuerto nuevo
controller.createAeropuerto = async function (data, callback) {
    try {
        let response = await Aeropuerto.create({
            CodigoIATA: data.CodigoIATA,
            Ciudad: data.Ciudad,
            Pais: data.Pais,
            ZonaHoraria: data.ZonaHoraria
        });
        callback(null);

    } catch (error) {
        callback(error);
    }
}

module.exports = controller;