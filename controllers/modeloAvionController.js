const sequelize = require('sequelize');
const db = require('../config/db');
const Modelo_Avion = require('../models/Modelo_Avion');

const controller = {};

//Obtiene todos los modelos de avion en la base de datos
controller.getModelosAvion = async function (callback) {
    try {
        let response = await Modelo_Avion.findAll({
            where: {
                Activo: 1
            },
        });
        let modelosAvion = response.map(result => result.dataValues);
        console.log(modelosAvion);
        callback(modelosAvion, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el modelo de avion cuyos atributos se quieren actualizar
controller.getModeloAvionUpdate = async function (ID, callback) {
    try {
        let modeloAvionUpdate = await Modelo_Avion.findOne({
            where: {
                ID
            }
        });
        console.log(modeloAvionUpdate);
        callback(modeloAvionUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del modelo de avion modificado
controller.updateModeloAvion = async function (data, ID, callback) {
    try {
        let response = await Modelo_Avion.update({
            Nombre: data.Nombre,
            PesoVacio: data.PesoVacio,
            MaxCargaEquipaje: data.MaxCargaEquipaje,
            CantBanios: data.CantBanios,
            VelocidadMax: data.VelocidadMax,
            CantAsientosECO: data.CantAsientosECO,
            CantAsientosPC: data.CantAsientosPC,
            DistDespegueCargaMax: data.DistDespegueCargaMax,
            VelocidadCrucero: data.VelocidadCrucero,
            PesoMax: data.PesoMax,
            TipoCombustible: data.TipoCombustible,
            CantSalidasE: data.CantSalidasE,
            CantCombustible: data.CantCombustible
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

//Desactiva un modelo de avion (Activo = 0)
controller.deleteModeloAvion = async function (ID, callback) {
    try {
        let response = await Modelo_Avion.update({
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

//Crea un modelo de avion nuevo en la base de datos
controller.createModeloAvion = async function (data, callback) {
    try {
        let response = await Modelo_Avion.create({
            Nombre: data.Nombre,
            PesoVacio: data.PesoVacio,
            MaxCargaEquipaje: data.MaxCargaEquipaje,
            CantBanios: data.CantBanios,
            VelocidadMax: data.VelocidadMax,
            CantAsientosECO: data.CantAsientosECO,
            CantAsientosPC: data.CantAsientosPC,
            DistDespegueCargaMax: data.DistDespegueCargaMax,
            VelocidadCrucero: data.VelocidadCrucero,
            PesoMax: data.PesoMax,
            TipoCombustible: data.TipoCombustible,
            CantSalidasE: data.CantSalidasE,
            CantCombustible: data.CantCombustible
        });
        callback(null)
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;