const sequelize = require('sequelize');
const db = require('../config/db');
const Mantenimiento = require('../models/Mantenimiento');

const controller = {};

//Obtiene todo el historial de mantenimientos de los aviones
controller.getMantenimientos = async function (callback) {
    try {
        let response = await Mantenimiento.findAll({
            where: {
                Activo: 1
            }
        });
        let mantenimientos = response.map(result => result.dataValues);
        console.log(mantenimientos);
        callback(mantenimientos, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el mantenimiento cuyos atributos se quieren actualizar
controller.getMantenimientoUpdate = async function (params, callback) {
    try {
        let mantenimientoUpdate = await Mantenimiento.findOne({
            where: {
                IDAvion: params.IDAvion,
                FechaEntrada: params.FechaEntrada
            }
        });
        console.log(mantenimientoUpdate);
        callback(mantenimientoUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del mantenimiento modificado
controller.updateMantenimiento = async function (data, params, callback) {
    try {
        let response = await Mantenimiento.update({
            IDAvion: data.IDAvion,
            FechaEntrada: data.FechaEntrada,
            FechaSalida: data.FechaSalida,
            Tipo: data.Tipo,
            Descripcion: data.Descripcion
        }, {
                where: {
                    IDAvion: params.IDAvion,
                    FechaEntrada: params.FechaEntrada
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Desactiva un mantenimiento (Activo = 0)
controller.deleteMantenimiento = async function (params, callback) {
    try {
        let response = await Mantenimiento.update({
            Activo: 0
        }, {
                where: {
                    IDAvion: params.IDAvion,
                    FechaEntrada: params.FechaEntrada
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Registra un mantenimiento
controller.createMantenimiento = async function (data, callback) {
    try {
        let response = await Mantenimiento.create({
            IDAvion: data.IDAvion,
            FechaEntrada: data.FechaEntrada,
            FechaSalida: data.FechaSalida,
            Tipo: data.Tipo,
            Descripcion: data.Descripcion
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;