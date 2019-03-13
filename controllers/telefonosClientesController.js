const sequelize = require('sequelize');
const db = require('../config/db');
const Telefonos_Clientes = require('../models/Telefonos_Clientes');

const controller = {};

//Obtiene todos los telefonos de un cliente
controller.getTelefonos = async function (IDCliente, callback) {
    try {
        let response = await Telefonos_Clientes.findAll({
            where: {
                IDCliente,
                Activo: 1
            }
        });
        let telefonos = response.map(result => result.dataValues);
        console.log(telefonos);
        callback(telefonos, null);
    } catch(error) {
        callback(null, error);
    }
}

//Desactiva un telefono que este asociado a un cliente (Activo = 0)
controller.deleteTelefono = async function (params, callback) {
    try {
        let response = await Telefonos_Clientes.update({
            Activo: 0
        }, {
            where: {
                IDCliente: params.IDCliente,
                Telefono: params.Telefono
            }
        });
        callback(null);
    } catch(error) {
        callback(error);
    }
}

//Crea un telefono nuevo
controller.createTelefono = async function (data, callback) {
    try {
        let response = await Telefonos_Clientes.create({
            IDCliente: data.IDCliente,
            Telefono: data.Telefono
        });
        callback(null);
    } catch(error) {
        callback(error);
    }
}

module.exports = controller;