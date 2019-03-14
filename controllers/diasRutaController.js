const sequelize = require('sequelize');
const db = require('../config/db');
const Dias_Ruta = require('../models/Dias_Ruta');

const controller = {};

//Obtiene todos los dias de una determinada ruta
controller.getDiasRuta = async function (IDRuta, callback) {
    try {
        let response = await Dias_Ruta.findAll({
            where: {
                IDRuta,
                Activo: 1
            }
        });
        let diasRuta = response.map(result => result.dataValues);
        console.log(diasRuta);
        callback(diasRuta, null);
    } catch (error) {
        callback(null, error);
    }
}

//Desactiva un dia de la ruta (Activo = 0)
controller.deleteDiasRuta = async function (params, callback) {
    try {
        let response = await Dias_Ruta.update({
            Activo: 0
        }, {
                where: {
                    IDRuta: params.IDRuta,
                    DiaSemana: params.DiaSemana
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