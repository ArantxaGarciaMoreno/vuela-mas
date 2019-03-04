const sequelize = require('sequelize');
const db = require('../config/db');
const cliente = require('../models/Cliente');

const controller = {};

//Obtiene todos los clientes
controller.getClientes = async function (callback) {
    try {
        let response = await cliente.findAll();
        let clientes = response.map(result => result.dataValues);
        console.log(clientes);
        callback(clientes, null);
    }catch (error) {
        callback(null, error);
    }
}

//Crea un cliente
controller.createCliente = async function (data, callback) {
    try {
        let response = await cliente.create({
            Pasaporte: data.Pasaporte,
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            Nacionalidad: data.Nacionalidad,
            FechaNacimiento: data.FechaNacimiento
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;