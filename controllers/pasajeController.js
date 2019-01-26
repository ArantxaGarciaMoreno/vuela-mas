const sequelize = require('sequelize');
const db = require('../config/db');
const Pasaje = require('../models/Pasaje');

const controller = {};

controller.getPasajes = async function (callback) {
    try {
        let response = await Pasaje.findAll({
            where: {
                Activo: 1
            }
        });
        let pasajes = response.map(result => result.dataValues);
        console.log(pasajes);
        callback(pasajes, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.deletePasaje = async function (id, callback) {
    try {
        let response = await Pasaje.update({
            /* Activo: false */
        }, {
                where: {
                    id
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createPasaje = async function (data, callback) {
    try {
        /* console.log(data.nombre, data.precio); */
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;