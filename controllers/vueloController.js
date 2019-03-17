const sequelize = require('sequelize');
const db = require('../config/db');
const Vuelo = require('../models/Vuelo');

const controller = {};

//Obtiene todos los vuelos
controller.getVuelos = async function (callback) {
    try {
        let response = await Vuelo.findAll({
            where: {
                Activo: 1
            },
        });
        let vuelos = response.map(result => result.dataValues);
        console.log(vuelos);
        callback(vuelos, null);
    } catch(error) {
        callback(null, error);
    }
}

controller.getVuelosEnRuta = async function (callback) {
    try {
        let vuelosEnRuta = await db.query(
            "SELECT ID, CodigoIATADestino, HoraLlegada FROM Vuelo " +
            "LEFT JOIN Desvio ON Vuelo.ID = Desvio.IDVuelo " +
            "WHERE Desvio.IDVuelo IS NULL " +
            "AND Vuelo.Activo = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(vuelosEnRuta);
        callback(vuelosEnRuta, null);
    } catch (error) {
        callback(null, error)
    }
}

//Obtiene el vuelo cuyos atributos se quieren actualizar
controller.getVueloUpdate = async function (ID, callback) {
    try {
        let vueloUpdate = await Vuelo.findOne({
            where: {
                ID
            }
        });
        console.log(vueloUpdate);
        callback(vueloUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getVuelo = async function (ID, callback) {
    try {
        let vuelo = await Vuelo.findOne({
            where: {
                ID
            }
        });
        console.log(vuelo);
        callback(vuelo, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del vuelo modificado
controller.updateVuelo = async function (data, ID, callback) {
    try {
        let response = await Vuelo.update({
            IDRuta: data.IDRuta,
            FechaSalida: data.FechaSalida,
            FechaLlegada: data.FechaLlegada,
            IDAvion: data.IDAvion,
            CodigoIATADestino: data.CodigoIATADestino,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada,
            Estado: data.Estado
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

controller.desviarVuelo = async function (IDVuelo, Destino, Llegada, callback) {
    try {
        let response = await Vuelo.update({
            CodigoIATADestino: Destino,
            HoraLlegada: Llegada,
            Estado: 'DESVIADO'
        }, {
            where: {
                ID: IDVuelo
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Desactiva un vuelo (Activo = 0)
controller.deleteVuelo = async function (ID, callback) {
    try {
        let response = await Vuelo.update({
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

//Crea un vuelo nuevo
controller.createVuelo = async function (data, callback) {
    try {
        let response = await Vuelo.create({
            IDRuta: data.IDRuta,
            FechaSalida: data.FechaSalida,
            FechaLlegada: data.FechaLlegada,
            IDAvion: data.IDAvion,
            CodigoIATADestino: data.CodigoIATADestino,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada,
            Estado: data.Estado
        });
        callback(null);
    } catch(error) {
        callback(error);
    }
}

module.exports = controller;