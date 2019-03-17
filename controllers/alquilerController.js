const sequelize = require('sequelize');
const db = require('../config/db');
const Alquiler = require('../models/Alquiler');

const controller = {};

//Obtiene todos los alquileres
controller.getAlquileres = async function (callback) {
    try {
        let response = await Alquiler.findAll({
            where: {
                Activo: 1
            },
        });
        let alquileres = response.map(result => result.dataValues);
        console.log(alquileres);
        callback(alquileres, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el Alquiler cuyos atributos se quieren actualizar
controller.getAlquilerUpdate = async function (IDProveedor, IDAvion, FechaSolicitud, callback) {
    try {
        let alquilerUpdate = await Alquiler.findOne({
            where: {
                Activo: 1,
                IDProveedor,
                IDAvion,
                FechaSolicitud
            }
        });
        console.log(alquilerUpdate);
        callback(alquilerUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del Alquiler modificado
controller.updateAlquiler = async function (data, IDProveedor, IDAvion, FechaSolicitud, callback) {
    try {
        let response = await Alquiler.update({
            IDProveedor: data.IDProveedor,
            IDAvion: data.IDAvion,
            FechaSolicitud: data.FechaSolicitud,
            FechaEntrega: data.FechaEntrega,
            FechaDevolucion: data.FechaDevolucion,
            MontoPagado: data.MontoPagado
        }, {
                where: {
                    IDProveedor,
                    IDAvion,
                    FechaSolicitud
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Obtiene los alquileres activos asociados a un avión específico
controller.getAvionAlquiler = async function (IDAvion, callback) {
    try {
        let response = await Alquiler.findAll({
            where: {
                IDAvion
            }
        });
        let alquileresAvion = response.map(result => result.dataValues);
        console.log(alquileresAvion);
        callback(alquileresAvion, null);
    } catch (error) {
        callback(null, error)
    }
}

//Desactiva un Alquiler (Activo = 0)
controller.deleteAlquiler = async function (IDProveedor, IDAvion, FechaSolicitud, callback) {
    try {
        let response = await Alquiler.update({
            Activo: 0
        }, {
                where: {
                    IDProveedor,
                    IDAvion,
                    FechaSolicitud
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Crea un Alquiler
controller.createAlquiler = async function (data, callback) {
    try {
        let response = await Alquiler.create({
            IDProveedor: data.IDProveedor,
            IDAvion: data.IDAvion,
            FechaSolicitud: data.FechaSolicitud,
            FechaEntrega: data.FechaEntrega,
            FechaDevolucion: data.FechaDevolucion,
            MontoPagado: data.MontoPagado
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;