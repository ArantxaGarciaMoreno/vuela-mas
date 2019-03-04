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
        let tarifas = response.map(result => result.DataValues);
        console.log(tarifas);
        callback(tarifas,null);

    } catch(error) {
        callback(null,error);
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

    } catch(error) {
        callback(error);
    }
}

//Crea una tarifa nueva
controller.createTarifa = async function (data, callback) {
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
    } catch(error) {
        callback(error);
    }
}

module.exports = controller;