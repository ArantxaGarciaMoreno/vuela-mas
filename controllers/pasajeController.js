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
            "Comprador.`Pasaporte` AS PasaporteC, Comprador.`Nombre` AS NombreC, Comprador.`Apellido` AS ApellidoC," +
            "`Pasaje`.`Asiento`, `Pasaje`.`Estado`, `Pasaje`.`FechaReserva`, `Pasaje`.`MetodoPago` " +
            "FROM `Pasaje` " +
            "INNER JOIN `Cliente` AS Pasajero ON `Pasaje`.`IDPasajero`= Pasajero.`ID` " +
            "INNER JOIN `Cliente` AS Comprador ON `Pasaje`.`IDComprador`= Comprador.`ID` " +
            "INNER JOIN `Vuelo` AS VueloR ON `Pasaje`.`IDVueloReservado`= VueloR.`ID` " +
            "INNER JOIN `Ruta` AS RutaR ON VueloR.`IDRuta`= RutaR.`ID` " +
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

controller.getPasajesCheckIn = async function (callback) {
    try {
        let checkin = await db.query(
            "SELECT Pasaje.ID AS ID, Pasajero.Nombre AS NombreP, Pasajero.Apellido AS ApellidoP " +
            "FROM Pasaje " +
            "INNER JOIN Cliente AS Pasajero ON Pasajero.ID = Pasaje.IDPasajero " +
            "WHERE Pasaje.IDVueloAbordado IS NULL " +
            "AND Pasaje.Estado = 'PAGADO';",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(checkin);
        callback(checkin, null);
    } catch(error) {
        console.log(error);
        callback(null, error);
    }
}

controller.getPasajesReservados = async function (data, callback) {
    try {
        let pasajesReservados = await db.query(
            "SELECT `Pasaje`.`ID`, `Pasaje`.`Estado`, Pasajero.`Nombre`, Pasajero.`Apellido`, VueloR.`FechaSalida`, VueloR.`FechaLlegada`, VueloR.`HoraSalida`, VueloR.`HoraLlegada`, `Ruta`.`CodigoIATAOrigen`, VueloR.`CodigoIATADestino`, " +
            "`Tarifa`.`CantEquipaje`, `Tarifa`.`PesoEquipaje`, `Tarifa`.`Clase`, `Tarifa`.`PrecioBase` " +
            "FROM `Pasaje` " +
            "INNER JOIN `Cliente` AS Pasajero ON Pasajero.`ID` = `Pasaje`.`IDPasajero` " +
            "INNER JOIN `Vuelo` AS VueloR ON `Pasaje`.`IDVueloReservado` = VueloR.`ID` " +
            "INNER JOIN `Ruta` ON VueloR.`IDRuta` = `Ruta`.`ID` " +
            "INNER JOIN `Tarifa` ON `Pasaje`.`IDTarifa` = `Tarifa`.`ID` " +
            "WHERE `Pasaje`.`IDComprador` = '" + data.Comprador + "' " +
            "AND `Pasaje`.`FechaReserva` = '" + data.FechaReserva + "' " +
            "AND `Pasaje`.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(pasajesReservados);
        callback(pasajesReservados, null);
    } catch(error) {
        console.log(error);
        callback(null, error);
    }
}

controller.getCheckedInE = async function (IDVuelo, callback) {
    try {
        let checkedin = await db.query(
            "select distinct(p.ID) AS ID, p.Asiento as Ocupado, t.Clase as Clase from pasaje as p " +
            "left join vuelo as v on v.ID = p.IDVueloAbordado " +
            "inner join avion as a on v.IDAvion = a.ID " +
            "inner join modelo_avion as m on m.ID = a.IDModeloAvion " +
            "inner join tarifa as t on t.ID = p.IDTarifa " +
            "where p.Asiento is not null " +
            "and t.Clase = 'Economica' " +
            "and v.ID = " + IDVuelo + " " +
            "order by p.Asiento asc;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(checkedin);
        callback(checkedin, null)
    } catch(error) {
        console.log(error);
        callback(null, error)
    }
}

controller.getCheckedInPC = async function (IDVuelo, callback) {
    try {
        let checkedin = await db.query(
            "select distinct(p.ID) AS ID, p.Asiento as Ocupado, t.Clase as Clase from pasaje as p " +
            "left join vuelo as v on v.ID = p.IDVueloAbordado " +
            "inner join avion as a on v.IDAvion = a.ID " +
            "inner join modelo_avion as m on m.ID = a.IDModeloAvion " +
            "inner join tarifa as t on t.ID = p.IDTarifa " +
            "where p.Asiento is not null " +
            "and t.Clase = 'Primera Clase' " +
            "and v.ID = " + IDVuelo + " " +
            "order by p.Asiento asc;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(checkedin);
        callback(checkedin, null)
    } catch(error) {
        console.log(error);
        callback(null, error)
    }
}

controller.getCheckIn = async function (data, callback) {
    try {
        let checkin = await db.query(
            "SELECT Pasaje.ID AS ID, Pasajero.Nombre AS NombreP, Pasajero.Apellido AS ApellidoP " +
            "FROM Pasaje " +
            "INNER JOIN Cliente AS Pasajero ON Pasajero.ID = Pasaje.IDPasajero " +
            "WHERE Pasaje.ID = " + data.Pasaje + ";",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(checkin);
        callback(checkin, null);
    } catch(error) {
        console.log(error);
        callback(null, error);
    }
}

controller.reservarAsiento = async function (ID, Vuelo, data, callback) {
    try {
        let response = await Pasaje.update({
            IDVueloAbordado: Vuelo,
            Asiento: data.Asiento,
        }, {
            where: {
                ID
            }
        });
        callback(null);
    } catch(error) {
        console.log(error);
        callback(error);
    }
}

controller.confirmarCompra = async function (ID, callback) {
    try {
        let response = await Pasaje.update({
            Estado: 'PAGADO'
        }, {
            where: {
                ID
            }
        });
        callback(null);
    } catch(error) {
        console.log(error);
        callback(error);
    }
}

controller.getClase = async function (ID, callback) {
    try {
        let clase = await db.query(
            "select p.ID as ID, t.clase as Clase from pasaje as p " +
            "inner join tarifa as t on t.ID = p.IDTarifa " +
            "where p.ID = " + ID + ";",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(clase);
        callback(clase, null);
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