const sequelize = require('sequelize');
const db = require('../config/db');
const Telefonos_Empleados = require('../models/Telefonos_Empleados');

const controller = {};

//Obtiene todos los telefonos de un empleado
controller.getTelefonos = async function (IDEmpleado, callback) {
    try {
        let response = await Telefonos_Empleados.findAll({
            where: {
                IDEmpleado,
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

//Desactiva un telefono que este asociado a un empleado (Activo = 0)
controller.deleteTelefono = async function (params, callback) {
    try {
        let response = await Telefonos_Empleados.update({
            Activo: 0
        }, {
            where: {
                IDEmpleado: params.IDEmpleado,
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
        let response = await Telefonos_Empleados.create({
            IDEmpleado: data.IDEmpleado,
            Telefono: data.Telefono
        });
        callback(null);
    } catch(error) {
        callback(error);
    }
}

module.exports = controller;