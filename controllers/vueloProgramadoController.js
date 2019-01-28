const sequelize = require('sequelize');
const db = require('../config/db');
const VueloProgramado = require('../models/VueloProgramado');

const controller = {};

controller.getVuelosProgramados = async function (callback) {
    try {
        let response = await VueloProgramado.findAll({
            where: {
                Activo: 1
            }
        });
        let vuelosProgramados = response.map(result => result.dataValues);
        console.log(vuelosProgramados);
        callback(vuelosProgramados, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.deleteVueloProgramado = async function (CodigoVuelo, callback) {
    try {
        let response = await VueloProgramado.update({
            Activo: 0
        }, {
                where: {
                    CodigoVuelo
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createVueloProgramado = async function (data, callback) {
    try {
        let response = await VueloProgramado.create({
            Origen: data.Origen,
            Destino: data.Destino,
            Dia: data.Dia,
            Hora: data.Hora,
            Duracion: data.Duracion
        });
        callback(null);

    } catch (error) {
        callback(error);
    }
}

module.exports = controller;