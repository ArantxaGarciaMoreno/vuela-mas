const sequelize = require('sequelize');
const db = require('../config/db');
const Avion = require('../models/Avion');

const controller = {};

//Obtiene todos los aviones en la base de datos
controller.getAviones = async function (callback) {
    try {
        let response = await Avion.findAll({
            where: {
                Activo: 1
            }
        });
        let aviones = response.map(result => result.dataValues);
        console.log(aviones);
        callback(aviones, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el avion cuyos atributos se quieren actualizar
controller.getAvionUpdate = async function (ID, callback) {
    try {
        let avionUpdate = await Avion.findOne({
            where: {
                ID
            }
        });
        console.log(avionUpdate);
        callback(avionUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del avion modificado
controller.updateAvion = async function (data, ID, callback) {
    try {
        let response = await Avion.update({
            IDModeloAvion: data.IDModeloAvion,
            Fabricante: data.Fabricante,
            Estado: data.Estado,
            hasInternet: data.hasInternet,
            CantTV: data.CantTV
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

//Desactiva un avion (Activo = 0)
controller.deleteAvion = async function (ID, callback) {
    try {
        let response = await Avion.update({
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

//Crea un avion nuevo en la base de datos
controller.createAvion = async function (data, callback) {
    try {
        let response = await Avion.create({
            IDModeloAvion: data.IDModeloAvion,
            Fabricante: data.Fabricante,
            Estado: data.Estado,
            hasInternet: data.hasInternet,
            CantTV: data.CantTV
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;