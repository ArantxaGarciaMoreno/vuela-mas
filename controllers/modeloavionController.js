const sequelize = require('sequelize');
const db = require('../config/db');
const Modelo_Avion = require('../models/Modelo_Avion');

const controller = {};

//Obtiene todos los modelos de avión
controller.getModelos = async function (callback) {
    try {
        let response = await Modelo_Avion.findAll({
            where: {
                Activo: 1
            }
        });
        let modelos = response.map(result => result.dataValues);
        console.log(modelos);
        callback(modelos, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el modelo de avión cuyos datos se quieren actualizar
controller.getModeloUpdate = async function (ID, callback) {
    try {
        let modeloUpdate = await Modelo_Avion.findOne({
            where: {
                ID
            }
        });
        console.log(modeloUpdate);
        callback(modeloUpdate, null);
    } catch(error) {
        callback(null, error);
    }
}

//Actualiza los atributos del modelo modificado
controller.updateModelo = async function (data, ID, callback) {
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
            MaxCargaCabina: data.MaxCargaCabina,
            CantCombustible: data.CantCombustible
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

//Desactiva un modelo de avión (Activo = 0)
controller.deleteModelo = async function (ID, callback) {
    try {
        let response = await Modelo_Avion.update({
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

//Crea un modelo de avión
controller.createModelo = async function (data, callback) {
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
            MaxCargaCabina: data.MaxCargaCabina,
            CantCombustible: data.CantCombustible
        });
        callback(null);
    } catch(error) {
        callback(error);
    }
}

module.exports = controller;