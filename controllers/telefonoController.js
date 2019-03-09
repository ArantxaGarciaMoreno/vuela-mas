const sequelize = require('sequelize');
const db = require('../config/db');
const Telefono = require('../models/Telefonos');

const controller = {};

//Obtiene todos los telefonos
controller.getTelefonos = async function (callback) {
    try {
        let response = await Telefono.findAll({
            where: {
                Activo: 1
            },
        });
        let telefonos = response.map(result => result.dataValues);
        console.log(telefonos);
        callback(telefonos, null);
    } catch(error) {
        callback(null, error);
    }
}

//Obtiene el telefono cuyos atributos se quieren actualizar
controller.getTelefonoUpdate = async function (IDPersona, callback) {
    try {
        let telefonoUpdate = await Telefono.findOne({
            where: {
                IDPersona
            }
        });
        console.log(telefonoUpdate);
        callback(telefonoUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del telefono modificado
controller.updateTelefono = async function (data, IDPersona, callback) {
    try {
        let response = await Telefono.update({
            IDPersona: data.IDPersona,
            Telefono: data.Telefono
        }, {
                where: {
                    IDPersona
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Desactiva un telefono (Activo = 0)
controller.deleteTelefono = async function (IDPersona, callback) {
    try {
        let response = await Telefono.update({
            Activo: 0
        }, {
            where: {
                IDPersona
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
        let response = await Telefono.create({
            IDPersona: data.IDPersona,
            Telefono: data.Telefono
        });
        callback(null);
    } catch(error) {
        callback(error);
    }
}

module.exports = controller;