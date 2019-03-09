const sequelize = require('sequelize');
const db = require('../config/db');
const Oferta_Proveedor = require('../models/Oferta_Proveedor');

const controller = {};

//Obtiene todos los modelos de avion que ofrece un determinado proveedor
controller.getModelosAvion = async function (IDProveedor, callback) {
    try {
        let modelosProveedor = await db.query(
            "SELECT `Modelo_Avion`.`Nombre`,`Modelo_Avion`.`PesoVacio`,`Modelo_Avion`.`MaxCargaEquipaje`,`Modelo_Avion`.`CantBanios`,`Modelo_Avion`.`VelocidadMax`," +
            "`Modelo_Avion`.`CantAsientosECO`,`Modelo_Avion`.`CantAsientosPC`,`Modelo_Avion`.`DistDespegueCargaMax`,`Modelo_Avion`.`VelocidadCrucero`," +
            "`Modelo_Avion`.`PesoMax`,`Modelo_Avion`.`TipoCombustible`,`Modelo_Avion`.`CantSalidasE`,`Modelo_Avion`.`CantCombustible`, `Oferta_Proveedor`.`IDProveedor`," +
            "`Oferta_Proveedor`.`IDModeloAvion`, `Proveedor`.`Nombre` AS `NombreProveedor`" +
            "FROM `Oferta_Proveedor`" +
            "INNER JOIN `Proveedor` ON `Oferta_Proveedor`.`IDProveedor`=`Proveedor`.`ID` " +
            "INNER JOIN `Modelo_Avion` ON `Oferta_Proveedor`.`IDModeloAvion`=`Modelo_Avion`.`ID` " +
            "WHERE `Oferta_Proveedor`.`IDProveedor`=" + IDProveedor + " " +
            "AND `Modelo_Avion`.`Activo`= 1 " +
            "AND `Oferta_Proveedor`.`Activo`=1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(1);
        callback(modelosProveedor, null);
    } catch (error) {
        callback(null, error);
    }
}

//Desactiva un modelo de avion que este asociado a un proveerdor. Esto sirve para saber si el proveedor ya no 
//ofrece un determinado modelo de avion (Activo = 0)
controller.deleteOfertaProveedor = async function (params, callback) {
    try {
        let response = await Oferta_Proveedor.update({
            Activo: 0
        }, {
                where: {
                    IDProveedor: params.IDProveedor,
                    IDModeloAvion: params.IDModeloAvion
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Agrega un modelo de avion a la oferta de un proveedor en la base de datos
controller.createOfertaProveedor = async function (data, callback) {
    try {
        let response = await Oferta_Proveedor.create({
            IDProveedor: data.IDProveedor,
            IDModeloAvion: data.IDModeloAvion

        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;