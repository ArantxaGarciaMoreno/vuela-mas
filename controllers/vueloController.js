const sequelize = require('sequelize');
const db = require('../config/db');
const Vuelo = require('../models/Vuelo');

const controller = {};

//Obtiene todos los vuelos
controller.getVuelos = async function (callback) {
    try {
        let response = await Vuelo.findAll({
            where: {
                Activo: 1
            },
        });
        let vuelos = response.map(result => result.dataValues);
        console.log(vuelos);
        callback(vuelos, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene el vuelo cuyos atributos se quieren actualizar
controller.getVueloUpdate = async function (ID, callback) {
    try {
        let vueloUpdate = await Vuelo.findOne({
            where: {
                ID
            }
        });
        console.log(vueloUpdate);
        callback(vueloUpdate, null);
    } catch (error) {
        callback(null, error);
    }
}

//Obtiene un vuelo por su ID
controller.getVuelo = async function (ID, callback) {
    try {
        let vuelo = await Vuelo.findOne({
            where: {
                ID
            }
        });
        console.log(vuelo);
        callback(vuelo, null);
    } catch (error) {
        callback(null, error);
    }
}

//Actualiza los atributos del vuelo modificado
controller.updateVuelo = async function (data, ID, callback) {
    try {
        let response = await Vuelo.update({
            IDRuta: data.IDRuta,
            FechaSalida: data.FechaSalida,
            FechaLlegada: data.FechaLlegada,
            IDAvion: data.IDAvion,
            CodigoIATADestino: data.CodigoIATADestino,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada,
            Estado: data.Estado
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

//Desactiva un vuelo (Activo = 0)
controller.deleteVuelo = async function (ID, callback) {
    try {
        let response = await Vuelo.update({
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

//Crea un vuelo nuevo
controller.createVuelo = async function (data, callback) {
    try {
        let response = await Vuelo.create({
            IDRuta: data.IDRuta,
            FechaSalida: data.FechaSalida,
            FechaLlegada: data.FechaLlegada,
            IDAvion: data.IDAvion,
            CodigoIATADestino: data.CodigoIATADestino,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada,
            Estado: data.Estado
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

//Busca los vuelos que puede tomar un cliente
controller.getOfertasVuelos = async function (data, callback) {
    try {
        let ofertasVuelos = await db.query(
            "SELECT `Vuelo`.`ID`, `Ruta`.`CodigoIATAOrigen`, `Ruta`.`CodigoIATADestino`, `Vuelo`.`FechaSalida`, `Vuelo`.`IDAvion`, `Vuelo`.`HoraSalida`, `Vuelo`.`HoraLlegada`, `Vuelo`.`Estado` " +
            "FROM `Vuelo` " +
            "INNER JOIN `Ruta` ON `Vuelo`.`IDRuta`=`Ruta`.`ID` " +
            "WHERE `Ruta`.`CodigoIATAOrigen` =  '" + data.Origen + "' " +
            "AND `Ruta`.`CodigoIATADestino`= '" + data.Destino + "' " +
            "AND `Vuelo`.`FechaSalida`= '" + data.FechaSalida + "' " +
            "AND `Vuelo`.`Estado` = 'A TIEMPO' " +
            "AND `Vuelo`.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(ofertasVuelos);
        callback(ofertasVuelos, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getEscalas1 = async function (data, callback) {
    try {
        let escalas1 = await db.query(
            "SELECT `Vuelo`.`ID`, `Ruta`.`CodigoIATAOrigen`, `Ruta`.`CodigoIATADestino`, `Vuelo`.`FechaSalida`, `Vuelo`.`FechaLlegada`, `Vuelo`.`IDAvion`, `Vuelo`.`HoraSalida`, `Vuelo`.`HoraLlegada`, `Vuelo`.`Estado` " +
            "FROM `Vuelo` " +
            "INNER JOIN `Ruta` ON `Vuelo`.`IDRuta`=`Ruta`.`ID` " +
            "WHERE `Ruta`.`CodigoIATAOrigen` =  '" + data.Origen + "' " +
            "AND `Vuelo`.`FechaSalida`= '" + data.FechaSalida + "' " +
            "AND `Vuelo`.`Estado` = 'A TIEMPO' " +
            "AND `Vuelo`.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(escalas1);
        callback(escalas1, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getEscalas2 = async function (escalas1, data, callback){
    var escalas = new  Array(escalas1.length);
    let escalas2;
    var cont;
    var aux;
    var origenes = [];
    var cont2;
    var posicion;

    for (let i = 0; i < escalas1.length; i++) {
        data.Origen = escalas1[i].CodigoIATADestino
        data.FechaLlegada = escalas1[i].FechaLlegada
        origenes.push(escalas1[i].CodigoIATAOrigen);
        aux = [];
        aux.push(escalas1[i]);
        cont = 0;
        do{
            try {
                escalas2 = await db.query(
                    "SELECT `Vuelo`.`ID`, `Vuelo`.`HoraSalida`, `Vuelo`.`HoraLlegada`, `Ruta`.`CodigoIATAOrigen`," +
                    " `Ruta`.`CodigoIATADestino` AS Destino, `Vuelo`.`FechaSalida`, `Vuelo`.`FechaLlegada` FROM `Vuelo`" +
                    " INNER JOIN `Ruta` ON `Ruta`.`ID` = `Vuelo`.`IDRuta`" +
                    " WHERE `Ruta`.`CodigoIATAOrigen` = '"+data.Origen+"'" +
                    " AND YEAR(`Vuelo`.`FechaSalida`) >= YEAR('"+data.FechaLlegada+"')" +
                    " AND MONTH(`Vuelo`.`FechaSalida`) >= MONTH('"+data.FechaLlegada+"')" +
                    " AND DAY(`Vuelo`.`FechaSalida`) >=  DAY('"+data.FechaLlegada+"')" +
                    " AND `Vuelo`.`Estado`='A TIEMPO'" +
                    " AND `Vuelo`.`Activo` = 1" +
                    " ORDER BY `Vuelo`.`FechaSalida` ASC LIMIT 1;",
                    { type: sequelize.QueryTypes.SELECT }
                );

                cont++;
                cont2 = 0;

                if(escalas2.length > 0){
                    data.Origen = escalas2[0].Destino
                    data.FechaLlegada = escalas2[0].FechaLlegada
                    posicion = 0;

                    for (let k = 0; k < escalas2.length; k++) {
                        if(escalas2[k].Destino == data.Destino){
                            data.Origen = escalas2[k].Destino
                            data.FechaLlegada = escalas2[k].FechaLlegada
                            posicion = k;
                            break;
                        }
                    }

                    origenes.push(escalas2[posicion].Origen);

                    for(let j =0; j < origenes.length; j++) {
                        if (origenes[j] == escalas2[posicion].Destino) {
                            cont2++;
                        }
                    }

                    if(cont2 == 0){
                        aux.push(escalas2[posicion]);
                    }

                } else {
                    posicion = 0;
                    escalas2 = [[{Destino: ''}]]
                }
            } catch(error){
                callback(null, error);
            }
        }while(data.Destino != escalas2[posicion].Destino && cont <= 3);
        
        escalas[i] = aux;
        origenes = [];
    }
    console.log(escalas);
    callback(escalas, null);
}

module.exports = controller;