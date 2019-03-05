const sequelize = require('sequelize');
const db = require('../config/db');
const Ruta = require('../models/Ruta');

const controller = {};

//Obtiene todas las rutas
controller.getRutas = async function (callback) {
    try {
        let response = await Ruta.findAll({
            where: {
                Activo: 1
            },
        });
        let rutas = response.map(result => result.dataValues);
        console.log(rutas);
        callback(rutas, null);
    } catch(error) {
        callback(null, error);
    }
}

//Obtiene la ruta cuyos atributos se quieren actualizar
controller.getRutaUpdate = async function (ID, callback) {
    try {
        let rutaUpdate = await Ruta.findOne({
            where: {
                ID
            }
        });
        console.log(rutaUpdate);
        callback(rutaUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos de la ruta modificada
controller.updateRuta = async function (data, ID, callback) {
    try {
        let response = await Ruta.update({
            CodigoIATAOrigen: data.CodigoIATAOrigen,
            CodigoIATADestino: data.CodigoIATADestino,
            IDAvion: data.IDAvion,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada
        }, {
                where: {
                    ID
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Desactiva una ruta (Activo = 0)
controller.deleteRuta = async function (ID, callback) {
    try {
        let response = await Ruta.update({
            Activo: 0
        }, {
            where: {
                ID
            }
        });
        callback(null);

    } catch(error) {
        callback(error);
    }
}

//Crea una ruta nueva
controller.createRuta = async function (data, callback) {
    try {
        let response = await Ruta.create({
            CodigoIATAOrigen: data.CodigoIATAOrigen,
            CodigoIATADestino: data.CodigoIATADestino,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada
        });
        callback(null);
    } catch(error) {
        callback(error);
    }
}

module.exports = controller;