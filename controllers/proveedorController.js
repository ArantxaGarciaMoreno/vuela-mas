const sequelize = require('sequelize');
const db = require('../config/db');
const Proveedor = require('../models/Proveedor');

const controller = {};

//Obtiene todos los proveedores en la base de datos
controller.getProveedores = async function (callback) {
    try {
        let response = await Proveedor.findAll({
            where: {
                Activo: 1
            },
        });
        let proveedores = response.map(result => result.dataValues);
        console.log(proveedores);
        callback(proveedores, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getProveedoresPTR = async function (callback) {
    try {
        let proveedoresPTR = await db.query(
            "SELECT `Proveedor`.`Nombre`, `Proveedor`.`Ciudad`, `Proveedor`.`Pais`, ROUND(AVG(DATEDIFF(`Alquiler`.`FechaEntrega`, `Alquiler`.`FechaSolicitud`)), 0) AS TRPromedio " +
            "FROM `Alquiler` " +
            "INNER JOIN `Proveedor` ON `Alquiler`.`IDProveedor`=`Proveedor`.`ID` " +
            "WHERE `Alquiler`.`Activo` = 1 " +
            "AND `Proveedor`.`Activo`= 1 " + 
            "GROUP BY `Alquiler`.`IDProveedor` " + 
            "ORDER BY TRPromedio ASC;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(proveedoresPTR);
        callback(proveedoresPTR, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getProveedoresPDA = async function (callback) {
    try {
        let proveedoresPDA = await db.query(
            "SELECT `Proveedor`.`Nombre`, `Proveedor`.`Ciudad`, `Proveedor`.`Pais`, ROUND(AVG((`Alquiler`.`MontoPagado`) DIV (DATEDIFF(`Alquiler`.`FechaDevolucion`, `Alquiler`.`FechaEntrega`))), 2) AS PDAPromedio " +
            "FROM `Alquiler` " +
            "INNER JOIN `Proveedor` ON `Alquiler`.`IDProveedor`=`Proveedor`.`ID` " +
            "WHERE `Alquiler`.`Activo` = 1 " +
            "AND `Proveedor`.`Activo` = 1 " + 
            "GROUP BY `Alquiler`.`IDProveedor` " + 
            "ORDER BY PDAPromedio ASC;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(proveedoresPDA);
        callback(proveedoresPDA, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el proveedor cuyos atributos se quieren actualizar
controller.getProveedorUpdate = async function (ID, callback) {
    try {
        let proveedorUpdate = await Proveedor.findOne({
            where: {
                ID
            }
        });
        console.log(proveedorUpdate);
        callback(proveedorUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el proveedor al cual se le dea ver la oferta de aviones
controller.getProveedorDetalle = async function (ID, callback) {
    try {
        let proveedorDetalle = await Proveedor.findOne({
            where: {
                ID
            }
        });
        console.log(proveedorDetalle);
        callback(proveedorDetalle, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del proveedor modificado
controller.updateProveedor = async function (data, ID, callback) {
    try {
        let response = await Proveedor.update({
            Nombre: data.Nombre,
            Ciudad: data.Ciudad,
            Pais: data.Pais
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

//Desactiva un proveedor (Activo = 0)
controller.deleteProveedor = async function (ID, callback) {
    try {
        let response = await Proveedor.update({
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

//Crea un proveedor nuevo en la base de datos
controller.createProveedor = async function (data, callback) {
    try {
        let response = await Proveedor.create({
            Nombre: data.Nombre,
            Ciudad: data.Ciudad,
            Pais: data.Pais
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;