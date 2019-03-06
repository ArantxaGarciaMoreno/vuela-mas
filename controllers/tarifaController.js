const sequelize = require('sequelize');
const db = require('../config/db');
const Tarifa = require('../models/Tarifa');

const controller = {}

//Obtiene todas las tarifas
controller.getTarifas = async function (callback) {
    try {
        let response = await Tarifa.findAll({
            where: {
                Activo: 1
            }
        });
        let tarifas = response.map(result => result.dataValues);
        console.log(tarifas);
        callback(tarifas, null);

    } catch (error) {
        callback(null, error);
    }
}

//Desactiva una tarifa (Activo = 0)
controller.deleteTarifa = async function (ID, callback) {
    try {
        let response = await Tarifa.update({
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

//Crea una tarifa nueva
controller.createTarifa = async function (data, callback) {
    console.log(data);
    try {
        let response = await Tarifa.create({
            Clase: data.Clase,
            PrecioBase: data.PrecioBase,
            CantEquipaje: data.CantEquipaje,
            PesoEquipaje: data.PesoEquipaje,
            FeeReserva: data.FeeReserva,
            FeeEquipajeExtra: data.FeeEquipajeExtra,
            FeePorVueloNoAbordado: data.FeePorVueloNoAbordado
        });
        console.log('1');
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Obtiene la tarifa cuyos atributos se quieren actualizar
controller.getTarifaUpdate = async function (ID, callback) {
    try {
        let tarifaUpdate = await Tarifa.findOne({
            where: {
                ID
            }
        });
        console.log(tarifaUpdate);
        callback(tarifaUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos de la tarifa modificada
controller.updateTarifa = async function (data, ID, callback) {
    try {
        let response = await Tarifa.update({
            Clase: data.Clase,
            PrecioBase: data.PrecioBase,
            CantEquipaje: data.CantEquipaje,
            PesoEquipaje: data.PesoEquipaje,
            FeeReserva: data.FeeReserva,
            FeeEquipajeExtra: data.FeeEquipajeExtra,
            FeePorVueloNoAbordado: data.FeePorVueloNoAbordado
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