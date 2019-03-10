const sequelize = require('sequelize');
const db = require('../config/db');
const Pista = require('../models/Pista');

const controller = {};

//Obtiene todos las pistas de un determinado aeropuerto
controller.getPistas = async function (CodigoIATA, callback) {
    try {
        let response = await Pista.findAll({
            where: {
                CodigoIATA,
                Activo: 1
            },
        });
        let pistas = response.map(result => result.dataValues);
        console.log(pistas);
        callback(pistas, null);
    } catch (error) {
        callback(null, error);
    }
}

//Desactiva una pista que este asociada a un aeropuerto.
controller.deletePista = async function (params, callback) {
    try {
        let response = await Pista.update({
            Activo: 0
        }, {
                where: {
                    CodigoIATA: params.CodigoIATA,
                    Distancia: params.Distancia
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Agrega una pista a las pistas de un aeropuerto en la base de datos
controller.createPista = async function (data, callback) {
    try {
        let response = await Pista.create({
            CodigoIATA: data.CodigoIATA,
            Distancia: data.Distancia

        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;