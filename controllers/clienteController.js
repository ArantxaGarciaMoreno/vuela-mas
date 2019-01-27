const sequelize = require('sequelize');
const db = require('../config/db');
const Cliente = require('../models/Cliente');

const controller = {};

//Obtiene todos los clientes
controller.getClientes = async function (callback) {
    try {
        let response = await Pasaje.findAll();
        let clientes = response.map(result => result.dataValues);
        console.log(clientes);
        callback(clientes,null);
    }catch (error) {
        callback(null, error);
    }
}

//Crea un cliente
controller.createCliente = async function (data, callback) {
    try {
        let response = await Cliente.create({
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            CI: data.CI
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;