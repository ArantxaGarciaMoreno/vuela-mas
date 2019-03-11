const sequelize = require('sequelize');
const db = require('../config/db');
const Dias_Ruta = require('../models/Dias_Ruta');

const controller = {};

//Obtiene todos los diasRuta
controller.getDiasRuta = async function (callback) {
    try {
        let response = await Dias_Ruta.findAll({
            where: {
                Activo: 1
            },
        });
        let diasRuta = response.map(result => result.dataValues);
        console.log(diasRuta);
        callback(diasRuta, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el dia cuyos atributos se quieren actualizar
controller.getDiasRutaUpdate = async function (IDRuta, DiaSemana, callback) {
    try {
        let diaRutaUpdate = await Dias_Ruta.findOne({
            where: {
                IDRuta,
                DiaSemana
            }
        });
        console.log(diaRutaUpdate);
        callback(diaRutaUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del dia modificado
controller.updateDiasRuta = async function (data, IDRuta, DiaSemana, callback) {
    try {
        let response = await Dias_Ruta.update({
            IDRuta: data.IDRuta,
            DiaSemana: data.DiaSemana
        }, {
                where: {
                    IDRuta,
                    DiaSemana
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Desactiva un dia (Activo = 0)
controller.deleteDiasRuta = async function (ID, callback) {
    try {
        let response = await Dias_Ruta.update({
            Activo: 0
        }, {
                where: {
                    IDRuta,
                    DiaSemana
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Crea un dia
controller.createDiasRuta = async function (data, callback) {
    try {
        let response = await Dias_Ruta.create({
            IDRuta: data.IDRuta,
            DiaSemana: data.DiaSemana
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;