const sequelize = require('sequelize');
const db = require('../config/db');
const Ruta = require('../models/Ruta');

const controller = {}

//Obtiene todas las rutas
controller.getRutas = async function (callback) {
    try {
        let response = await Ruta.findAll({
            where: {
                Activo: 1
            }
        });
        let rutas = response.map(result => result.DataValues);
        console.log(rutas);
        callback(rutas,null);

    } catch(error) {
        callback(null,error);
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
    } catch(error) {
        callback(error);
    }
}

module.exports = controller;