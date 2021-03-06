const sequelize = require('sequelize');
const db = require('../config/db');
const Cliente = require('../models/Cliente');

const controller = {};

//Obtiene todos los clientes
controller.getClientes = async function (callback) {
    try {
        let response = await Cliente.findAll({
            where: {
                Activo: 1
            },
        });
        let clientes = response.map(result => result.dataValues);
        callback(clientes, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el cliente cuyos atributos se quieren actualizar
controller.getClienteUpdate = async function (ID, callback) {
    try {
        let clienteUpdate = await Cliente.findOne({
            where: {
                ID
            }
        });
        console.log(clienteUpdate);
        callback(clienteUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getCliente = async function (ID, callback) {
    try {
        let cliente = await Cliente.findOne({
            where: {
                ID
            }
        });
        console.log(cliente);
        callback(cliente, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getCompradores = async function (callback) {
    try {
        let compradores = await db.query(
            "SELECT c.ID, c.Pasaporte, c.Nombre, c.Apellido FROM pasaje " +
            "INNER JOIN Cliente AS c ON pasaje.IDComprador = c.ID " +
            "WHERE pasaje.Activo = 1 " +
            "GROUP BY pasaje.IDComprador;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(compradores);
        callback(compradores, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del cliente modificado
controller.updateCliente = async function (data, ID, callback) {
    try {
        let response = await Cliente.update({
            Pasaporte: data.Pasaporte,
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            PaisNacimiento: data.PaisNacimiento,
            FechaNacimiento: data.FechaNacimiento
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

//Desactiva un cliente (Activo = 0)
controller.deleteCliente = async function (ID, callback) {
    try {
        let response = await Cliente.update({
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

//Crea un cliente
controller.createCliente = async function (data, callback) {
    try {
        let response = await Cliente.create({
            Pasaporte: data.Pasaporte,
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            PaisNacimiento: data.PaisNacimiento,
            FechaNacimiento: data.FechaNacimiento
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;