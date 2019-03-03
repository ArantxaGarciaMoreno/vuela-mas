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

//Desactiva un pasaje (Activo = 0)
controller.deletePasaje = async function (ID, callback) {
    try {
        let response = await Pasaje.update({
            Activo: 0
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

//Crea un pasaje nuevo
controller.createPasaje = async function (data, callback) {
    try {
        let response = await Pasaje.create({
            IDPasajero: data.IDPasajero,
            IDVueloReservado: data.IDVueloReservado,
            IDTarifa: data.IDTarifa,
            IDComprador: data.IDComprador,
            IDVueloAbordado: data.IDVueloAbordado,
            Asiento: data.Asiento,
            Estado: data.Estado,
            FechaReserva: data.FechaReserva,
            MetodoPago: data.MetodoPago
        });
        callback(null);

    } catch (error) {
        callback(error);
    }
}

module.exports = controller;