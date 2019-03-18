const sequelize = require('sequelize');
const db = require('../config/db');
const Pasaje = require('../models/Pasaje');

const controller = {};

//Obtiene los pasajes que se encuentren activos (Activo=1)
controller.getPasajes = async function (callback) {
    try {
        let pasajes = await db.query(
            "SELECT `Pasaje`.`ID` AS PasajeID, Pasajero.`Pasaporte` AS PasaporteP, Pasajero.`Nombre` AS NombreP, Pasajero.`Apellido` AS ApellidoP, RutaR.`CodigoIATAOrigen` AS CodigoIATAOrigenR," +
            "VueloR.`CodigoIATADestino` AS CodigoIATADestinoR, VueloR.`FechaSalida` AS FechaSalidaR,`Tarifa`.`Clase`,`Tarifa`.`ID` AS TarifaID," +
            "Comprador.`Pasaporte` AS PasaporteC, Comprador.`Nombre` AS NombreC, Comprador.`Apellido` AS ApellidoC, RutaA.`CodigoIATAOrigen` AS CodigoIATAOrigenA, VueloA.`CodigoIATADestino` AS CodigoIATADestinoA," +
            "VueloA.`FechaSalida` AS FechaSalidaA, `Pasaje`.`Asiento`, `Pasaje`.`Estado`, `Pasaje`.`FechaReserva`, `Pasaje`.`MetodoPago` " +
            "FROM `Pasaje` " +
            "INNER JOIN `Cliente` AS Pasajero ON `Pasaje`.`IDPasajero`= Pasajero.`ID` " +
            "INNER JOIN `Cliente` AS Comprador ON `Pasaje`.`IDComprador`= Comprador.`ID` " +
            "INNER JOIN `Vuelo` AS VueloR ON `Pasaje`.`IDVueloReservado`= VueloR.`ID` " +
            "INNER JOIN `Vuelo` AS VueloA ON `Pasaje`.`IDVueloAbordado`= VueloA.`ID` " +
            "INNER JOIN `Ruta` AS RutaR ON VueloR.`IDRuta`= RutaR.`ID` " +
            "INNER JOIN `Ruta` AS RutaA ON VueloA.`IDRuta`= RutaA.`ID` " +
            "INNER JOIN `Tarifa` ON `Pasaje`.`IDTarifa`=`Tarifa`.`ID` " +
            "WHERE `Pasaje`.`Activo`= 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log('Aqui');
        console.log(pasajes);
        callback(pasajes, null);
    } catch (error) {
        console.log(error);
        callback(null, error);
    }
}

//Desactiva un pasaje (Activo = 0)
controller.deletePasaje = async function (ID, callback) {
    try {
        let response = await Pasaje.update({
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

//Crea un pasaje nuevo
controller.createPasaje = async function (data, callback) {
    try {
        let response = await Pasaje.create({
            IDPasajero: data.IDPasajero,
            IDVueloReservado: data.IDVueloReservado,
            IDTarifa: data.IDTarifa,
            IDComprador: data.IDComprador,
            Estado: data.Estado,
            FechaReserva: data.FechaReserva,
            MetodoPago: data.MetodoPago
        });
        callback(null);

    } catch (error) {
        console.log(error);
        callback(error);
    }
}

//Obtiene el modelo de avion cuyos atributos se quieren actualizar
controller.getPasajeUpdate = async function (ID, callback) {
    try {
        let pasajeUpdate = await Pasaje.findOne({
            where: {
                ID
            }
        });
        console.log(pasajeUpdate);
        callback(pasajeUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del modelo de avion modificado
controller.updatePasaje = async function (data, ID, callback) {
    try {
        let response = await Pasaje.update({
            IDPasajero: data.IDPasajero,
            IDVueloReservado: data.IDVueloReservado,
            IDTarifa: data.IDTarifa,
            IDComprador: data.IDComprador,
            Estado: data.Estado,
            FechaReserva: data.FechaReserva,
            MetodoPago: data.MetodoPago
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

module.exports = controller;