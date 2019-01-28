const sequelize = require('sequelize');
const db = require('../config/db');
const Pasaje = require('../models/Pasaje');

const controller = {};

//Obtiene los pasajes que se encuentren activos (Activo=1)
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

//(Activo=n => Activo=0)
controller.deletePasaje = async function (Reserva, callback) {
    try {
        let response = await Pasaje.update({
            Activo: 0
        }, {
                where: {
                    Reserva
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Crea un pasaje nuevo
controller.createPasaje = async function (data, callback) {
    try {
        let response = await Pasaje.create({
            Reserva: data.Reserva,
            Pasajero: data.Pasajero
        });
        callback(null);

    } catch (error) {
        callback(error);
    }
}

module.exports = controller;