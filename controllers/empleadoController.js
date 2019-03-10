const sequelize = require('sequelize');
const db = require('../config/db');
const Empleado = require('../models/Empleado');

const controller = {};

//Obtiene todos los empleados
controller.getEmpleados = async function (callback) {
    try {
        let response = await Empleado.findAll({
            where: {
                Activo: 1
            }
        });
        let empleados = response.map(result => result.dataValues);
        console.log(empleados);
        callback(empleados, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el empleado cuyos atributos se quieren actualizar
controller.getEmpleadoUpdate = async function (ID, callback) {
    try {
        let empleadoUpdate = await Empleado.findOne({
            where: {
                ID
            }
        });
        console.log(empleadoUpdate);
        callback(empleadoUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del empleado modificado
controller.updateEmpleado = async function (data, ID, callback) {
    try {
        let response = await Empleado.update({
            Pasaporte: data.Pasaporte,
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            PaisNacimiento: data.PaisNacimiento,
            FechaNacimiento: data.FechaNacimiento,
            Cargo: data.Cargo
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

//Desactiva un empleado (Activo = 0)
controller.deleteEmpleado = async function (ID, callback) {
    try {
        let response = await Empleado.update({
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

//Crea un empleado
controller.createEmpleado = async function (data, callback) {
    try {
        let response = await Empleado.create({
            Pasaporte: data.Pasaporte,
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            PaisNacimiento: data.PaisNacimiento,
            FechaNacimiento: data.FechaNacimiento,
            Cargo: data.Cargo
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;