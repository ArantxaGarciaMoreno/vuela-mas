const sequelize = require('sequelize');
const db = require('../config/db');
const Tripulacion = require('../models/Tripulacion');

const controller = {};

//Obtiene todos los tripulaciones
controller.getTripulaciones = async function (callback) {
    try {
        let response = await Tripulacion.findAll({
            where: {
                Activo: 1
            }
        });
        let tripulaciones = response.map(result => result.dataValues);
        console.log(tripulaciones);
        callback(tripulaciones, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene la Tripulacion cuyos atributos se quieren actualizar
controller.getTripulacionUpdate = async function (IDEmpleado, IDVueloTrabajado, callback) {
    try {
        let tripulacionUpdate = await Tripulacion.findOne({
            where: {
                Activo: 1,
                IDEmpleado,
                IDVueloTrabajado
            }
        });
        console.log(tripulacionUpdate);
        callback(tripulacionUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del Tripulacion modificado
controller.updateTripulacion = async function (data, IDEmpleado, IDVueloTrabajado, callback) {
    try {
        let response = await Tripulacion.update({
            IDEmpleado: data.IDEmpleado,
            IDVueloTrabajado: data.IDVueloTrabajado
        }, {
                where: {
                    IDEmpleado,
                    IDVueloTrabajado
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Desactiva un Tripulacion (Activo = 0)
controller.deleteTripulacion = async function (IDEmpleado, IDVueloTrabajado, callback) {
    try {
        let response = await Tripulacion.update({
            Activo: 0
        }, {
                where: {
                    IDEmpleado,
                    IDVueloTrabajado
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Elimina un Tripulacion
controller.destroyTripulacion = async function (IDEmpleado, IDVueloTrabajado, callback) {
    try {
        let response = await Tripulacion.destroy({
            where: {
                IDEmpleado,
                IDVueloTrabajado
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Crea un Tripulacion nuevo
controller.createTripulacion = async function (data, callback) {
    try {
        let response = await Tripulacion.create({
            IDEmpleado: data.IDEmpleado,
            IDVueloTrabajado: data.IDVueloTrabajado
        });
        callback(null);

    } catch (error) {
        callback(error);
    }
}

module.exports = controller;