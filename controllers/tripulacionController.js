const sequelize = require('sequelize');
const db = require('../config/db');
const Tripulacion = require('../models/Tripulacion');

const controller = {};

//Obtiene todos los miembros de la tripulacion de un vuelo
controller.getTripulacion = async function (IDVueloTrabajado, callback) {
    try {
        let tripulacion = await db.query(
            "SELECT `Empleado`.`ID`,`Empleado`.`Pasaporte`, `Empleado`.`Nombre`, `Empleado`.`Apellido`, `Empleado`.`Cargo`, `Tripulacion`.`IDVueloTrabajado` " +
            "FROM `Tripulacion` " +
            "INNER JOIN `Empleado` ON `Tripulacion`.`IDEmpleado`=`Empleado`.`ID` " +
            "WHERE `Tripulacion`.`IDVueloTrabajado`=" + IDVueloTrabajado + " " +
            "AND `Tripulacion`.`Activo`= 1 " +
            "AND `Empleado`.`Activo`= 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(1);
        callback(tripulacion, null);
    } catch (error) {
        callback(null, error);
    }
}

//Desactiva un miembro de la tripulacion de un vuelo (Activo = 0)
controller.deleteTripulacion = async function (IDEmpleado, IDVueloTrabajado, callback) {
    try {
        let response = await Tripulacion.update({
            Activo: 0
        }, {
                where: {
                    IDEmpleado,
                    IDVueloTrabajado
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Elimina un Tripulacion
controller.destroyTripulacion = async function (IDEmpleado, IDVueloTrabajado, callback) {
    try {
        let response = await Tripulacion.destroy({
            where: {
                IDEmpleado,
                IDVueloTrabajado
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Crea un miembro de tripulacion nuevo
controller.createTripulacion = async function (data, callback) {
    try {
        let response = await Tripulacion.create({
            IDEmpleado: data.IDEmpleado,
            IDVueloTrabajado: data.IDVueloTrabajado
        });
        callback(null);

    } catch (error) {
        callback(error);
    }
}

module.exports = controller;