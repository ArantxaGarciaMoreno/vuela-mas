const sequelize = require('sequelize');
const db = require('../config/db');
const Ruta = require('../models/Ruta');

const controller = {};

//Obtiene todas las rutas
controller.getRutas = async function (callback) {
    try {
        let response = await Ruta.findAll({
            where: {
                Activo: 1
            },
            attributes: ['ID', 'CodigoIATAOrigen', 'CodigoIATADestino', 'IDAvion', [sequelize.fn('TIME_FORMAT', sequelize.col('HoraSalida'), '%H:%i'), 'HoraSalida'], [sequelize.fn('TIME_FORMAT', sequelize.col('HoraLlegada'), '%H:%i'), 'HoraLlegada']]
        });
        let rutas = response.map(result => result.dataValues);
        console.log(rutas);
        callback(rutas, null);
    } catch(error) {
        callback(null, error);
    }
}

controller.getRutaZA = async function (callback) {
    try {
        let rutaZA = await db.query(
            "SELECT r.ID AS ID, r.CodigoIATAOrigen AS CodigoIATAOrigen, r.CodigoIATADestino AS CodigoIATADestino, r.IDAvion AS IDAvion, TIME_FORMAT(r.HoraSalida, '%H:%i') AS HoraSalida, TIME_FORMAT(TIME(CURDATE() + INTERVAL TIME_TO_SEC(r.HoraLlegada) SECOND + INTERVAL (a.ZonaHoraria-b.ZonaHoraria)*3600 SECOND), '%H:%i') AS HoraLlegada " +
            "FROM `Ruta` AS `r` " +
            "INNER JOIN `Aeropuerto` AS `a` ON `a`.`CodigoIATA`=`r`.`CodigoIATADestino` " +
            "INNER JOIN `Aeropuerto` AS `b` ON `b`.`CodigoIATA`=`r`.`CodigoIATAOrigen` " +
            "WHERE `a`.`Activo`= 1 "+
            "AND `r`.`Activo`= 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(1);
        callback(rutaZA, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene la ruta cuyos atributos se quieren actualizar
controller.getRutaUpdate = async function (ID, callback) {
    try {
        let rutaUpdate = await Ruta.findOne({
            where: {
                ID
            },
            attributes: ['ID', 'CodigoIATAOrigen', 'CodigoIATADestino', 'IDAvion', [sequelize.fn('TIME_FORMAT', sequelize.col('HoraSalida'), '%H:%i'), 'HoraSalida'], [sequelize.fn('TIME_FORMAT', sequelize.col('HoraLlegada'), '%H:%i'), 'HoraLlegada']]
        });
        console.log(rutaUpdate);
        callback(rutaUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos de la ruta modificada
controller.updateRuta = async function (data, ID, callback) {
    try {
        let response = await Ruta.update({
            CodigoIATAOrigen: data.CodigoIATAOrigen,
            CodigoIATADestino: data.CodigoIATADestino,
            IDAvion: data.IDAvion,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada
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

//Desactiva una ruta (Activo = 0)
controller.deleteRuta = async function (ID, callback) {
    try {
        let response = await Ruta.update({
            Activo: 0
        }, {
            where: {
                ID
            }
        });
        callback(null);

    } catch(error) {
        callback(error);
    }
}

//Crea una ruta nueva
controller.createRuta = async function (data, callback) {
    try {
        let response = await Ruta.create({
            CodigoIATAOrigen: data.CodigoIATAOrigen,
            CodigoIATADestino: data.CodigoIATADestino,
            IDAvion: data.IDAvion,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada
        });
        callback(null);
    } catch(error) {
        callback(error);
    }
}

module.exports = controller;