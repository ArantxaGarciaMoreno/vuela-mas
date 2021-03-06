const sequelize = require('sequelize');
const db = require('../config/db');
const Aeropuerto = require('../models/Aeropuerto');

const controller = {};

//Obtiene todos los aeropuertos
controller.getAeropuertos = async function (callback) {
    try {
        let response = await Aeropuerto.findAll({
            where: {
                Activo: 1
            }
        });
        let aeropuertos = response.map(result => result.dataValues);
        console.log(aeropuertos);
        callback(aeropuertos, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getAeropuertosDistintos = async function (CodigoIATA, callback) {
    try {
        let diferentes = await db.query(
            "SELECT CodigoIATA FROM Aeropuerto " +
            `WHERE CodigoIATA != '${CodigoIATA}';`,
            { type: sequelize.QueryTypes.SELECT }
        ); 
        console.log(diferentes);
        callback(diferentes, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getAeropuertosTop = async function (callback) {
    try {
        let top = await db.query(
            "SELECT a.Ciudad, a.Pais, a.CodigoIATA, COUNT(IF(v.Estado != 'DESVIADO' AND v.Estado != 'CANCELADO' AND v.Activo !=0 AND v.Activo IS NOT NULL AND CONCAT(v.FechaLlegada, ' ', v.HoraLlegada) <= NOW(), 1, NULL)) AS Vuelos FROM aeropuerto AS a " +
            "LEFT JOIN vuelo AS v ON v.CodigoIATADestino = a.CodigoIATA " +
            "WHERE a.Activo = 1 " +
            "GROUP BY a.CodigoIATA " +
            "ORDER BY Vuelos DESC, a.Pais ASC;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(top);
        callback(top, null)
    } catch (error) {
        console.log(error);
        callback(null, error);
    }
}

//Obtiene el aeropuerto cuyos atributos se quieren actualizar
controller.getAeropuertosUpdate = async function (CodigoIATA, callback) {
    try {
        let aeropuertosUpdate = await Aeropuerto.findOne({
            where: {
                Activo: 1,
                CodigoIATA
            }
        });
        console.log(aeropuertosUpdate);
        callback(aeropuertosUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del aeropuerto modificado
controller.updateAeropuerto = async function (data, CodigoIATA, callback) {

    var pais;

    if (data.Ciudad == 'Caracas') {
        pais = 'Venezuela'
    } else if (data.Ciudad == 'París') {
        pais = 'Francia'
    } else if (data.Ciudad == 'Dubai') {
        pais = 'Emiratos Árabes Unidos'
    } else if ((data.Ciudad == 'Atlanta')||(data.Ciudad == 'Miami')||(data.Ciudad == 'New York')) {
        pais = 'Estados Unidos de América'
    }

    try {
        let response = await Aeropuerto.update({
            Ciudad: data.Ciudad,
            Pais: pais,
            ZonaHoraria: data.ZonaHoraria
        }, {
                where: {
                    CodigoIATA
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Desactiva un aeropuerto (Activo = 0)
controller.deleteAeropuerto = async function (CodigoIATA, callback) {
    try {
        let response = await Aeropuerto.update({
            Activo: 0
        }, {
                where: {
                    CodigoIATA
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Elimina un aeropuerto
controller.destroyAeropuerto = async function (CodigoIATA, callback) {
    try {
        let response = await Aeropuerto.destroy({
            where: {
                CodigoIATA
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Crea un aeropuerto nuevo
controller.createAeropuerto = async function (data, callback) {

    var pais;

    if (data.Ciudad == 'Caracas') {
        pais = 'Venezuela'
    } else if (data.Ciudad == 'París') {
        pais = 'Francia'
    } else if (data.Ciudad == 'Dubai') {
        pais = 'Emiratos Árabes Unidos'
    } else if ((data.Ciudad == 'Atlanta')||(data.Ciudad == 'Miami')||(data.Ciudad == 'New York')) {
        pais = 'Estados Unidos de América'
    }

    try {
        let response = await Aeropuerto.create({
            CodigoIATA: data.CodigoIATA,
            Ciudad: data.Ciudad,
            Pais: pais,
            ZonaHoraria: data.ZonaHoraria
        });
        callback(null);

    } catch (error) {
        callback(error);
    }
}

controller.getAeropuerto = async function (CodigoIATA, callback) {
    try {
        let aeropuerto = await Aeropuerto.findOne({
            where: {
                CodigoIATA
            }
        });
        console.log(aeropuerto);
        callback(aeropuerto, null);
    } catch (error) {
        callback(null, error);
    }
}

module.exports = controller;