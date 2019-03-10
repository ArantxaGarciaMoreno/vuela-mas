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
            attributes: ['CodigoIATA', 'Ciudad', 'Pais', [sequelize.fn('concat', 'UTC ', sequelize.col('ZonaHoraria'), ':00'), 'ZonaHoraria']]
        });
        let aeropuertos = response.map(result => result.dataValues);
        console.log(aeropuertos);
        callback(aeropuertos, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el aeropuerto cuyos atributos se quieren actualizar
controller.getAeropuertosUpdate = async function (CodigoIATA, callback) {
    try {
        let aeropuertosUpdate = await Aeropuerto.findOne({
            where: {
                Activo: 1,
                CodigoIATA
            },
            attributes: ['CodigoIATA', 'Ciudad', 'Pais', [sequelize.fn('concat', 'UTC ', sequelize.col('ZonaHoraria'), ':00'), 'ZonaHoraria']]
        });
        console.log(aeropuertosUpdate);
        callback(aeropuertosUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del aeropuerto modificado
controller.updateAeropuerto = async function (data, CodigoIATA, callback) {
    try {
        let response = await Aeropuerto.update({
            CodigoIATA: data.CodigoIATA,
            Ciudad: data.Ciudad,
            Pais: data.Pais,
            ZonaHoraria: data.ZonaHoraria
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

//Elimina un aeropuerto
controller.destroyAeropuerto = async function (CodigoIATA, callback) {
    try {
        let response = await Aeropuerto.destroy({
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