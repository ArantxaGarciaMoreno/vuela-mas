const sequelize = require('sequelize');
const db = require('../config/db');
const Desvio = require('../models/Desvio');

const controller = {};

controller.getDesvios = async function (callback) {
    try {
        let response = await Desvio.findAll();
        let desvios = response.map(result => result.dataValues);
        console.log(desvios);
        callback(desvios, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.deleteDesvio = async function (IDVuelo, callback) {
    try {
        let response = await Desvio.update({
            Activo: 0
        }, {
                where: {
                    IDVuelo
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.destroyDesvio = async function (IDVuelo, callback) {
    try {
        let response = await Desvio.destroy({
            where: {
                IDVuelo
            }
        });
        callback(null);
    } catch(error) {
        callback(error);
    }
}

controller.createDesvio = async function (data, IDVuelo, callback) {
    try {
        let response = await Desvio.create({
           IDVuelo: IDVuelo,
           Destino: data.Destino,
           Llegada: data.Llegada
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;