const sequelize = require('sequelize');
const db = require('../config/db');
const Vuelo = require('../models/Vuelo');
const Op = sequelize.Op;

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

controller.getVuelosR = async function (callback) {
    try {
        let vuelos = await db.query(
            "SELECT `Ruta`.`CodigoIATAOrigen`, `Vuelo`.`ID`, `Vuelo`.`CodigoIATADestino`, `Vuelo`.`FechaSalida` " +
            "FROM `Vuelo` " +
            "INNER JOIN `Ruta` ON `Vuelo`.`IDRuta`= `Ruta`.`ID` " +
            "WHERE `Vuelo`.`Activo`= 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(vuelos);
        callback(vuelos, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getVueloCheckin = async function (data, callback) {
    try {
        let vueloCheckin = await db.query(
            "SELECT v.ID AS ID, o.Ciudad AS Origen, d.Ciudad AS Destino, v.HoraSalida AS Hora, v.FechaSalida AS Fecha FROM Vuelo AS v " +
            "INNER JOIN Ruta AS r ON r.ID = v.IDRuta " +
            "INNER JOIN Aeropuerto AS o ON o.CodigoIATA = r.CodigoIATAOrigen " +
            "INNER JOIN Aeropuerto AS d ON d.CodigoIATA = r.CodigoIATADestino " +
            "INNER JOIN Pasaje AS p ON p.ID = " + data.Pasaje + " " +
            "WHERE v.ID = p.IDVueloReservado;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(vueloCheckin);
        callback(vueloCheckin, null);
    } catch(error) {
        console.log(error);
        callback(null, error);
    }
}

controller.getVueloDestino = async function (Vuelo, Fecha, Hora, Origen, Destino, callback) {
    try {
        let mismoDestino = await db.query(
            "SELECT v.ID, r.CodigoIATAOrigen AS Origen, r.CodigoIATADestino AS Destino, v.FechaSalida AS Fecha, v.HoraSalida AS Hora FROM Vuelo AS v " +
            "INNER JOIN Ruta AS r ON r.ID = v.IDRuta " +
            "WHERE TIMEDIFF('" + Fecha + " " + Hora + "', CONCAT(v.FechaSalida, ' ', v.HoraSalida)) < 0 " +
            "AND r.CodigoIATAOrigen = '" + Origen + "' " +
            "AND r.CodigoIATADestino = '" + Destino + "' " + 
            "AND v.ID != " + Vuelo +" " +
            "ORDER BY Fecha ASC, Hora ASC;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(mismoDestino);
        callback(mismoDestino, null);
    } catch(error) {
        console.log(error);
        callback(null, error);
    }
}

controller.getVuelosATiempo = async function (callback) {
    try {
        let vuelosAtiempo = await db.query(
            "SELECT `Ruta`.`CodigoIATAOrigen`, `Vuelo`.`ID`, `Vuelo`.`CodigoIATADestino`, `Vuelo`.`FechaSalida`, Vuelo.HoraSalida " +
            "FROM `Vuelo` " +
            "INNER JOIN `Ruta` ON `Vuelo`.`IDRuta`= `Ruta`.`ID` " +
            "WHERE `Vuelo`.`Estado` = 'A TIEMPO' " +
            "AND `Vuelo`.`Activo`= 1 " +
            "ORDER BY Vuelo.FechaSalida ASC, Vuelo.HoraSalida ASC;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(vuelosAtiempo);
        callback(vuelosAtiempo, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getVuelosATiempoODemorados = async function (callback) {
    try {
        let response = await Vuelo.findAll({
            where: {
                Activo: 1,
                [Op.or]: [{ Estado: 'A TIEMPO' }, { Estado: 'DEMORADO' }]
            },
        });
        let vuelosAoD = response.map(result => result.dataValues);
        console.log(vuelosAoD);
        callback(vuelosAoD, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getVuelosEnRuta = async function (callback) {
    try {
        let vuelosEnRuta = await db.query(
            "SELECT ID, CodigoIATADestino, HoraLlegada FROM Vuelo " +
            "LEFT JOIN Desvio ON Vuelo.ID = Desvio.IDVuelo " +
            "WHERE Desvio.IDVuelo IS NULL " +
            "AND Vuelo.Activo = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(vuelosEnRuta);
        callback(vuelosEnRuta, null);
    } catch (error) {
        callback(null, error)
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

controller.desviarVuelo = async function (IDVuelo, Destino, Llegada, callback) {
    try {
        let response = await Vuelo.update({
            CodigoIATADestino: Destino,
            HoraLlegada: Llegada,
            Estado: 'DESVIADO'
        }, {
                where: {
                    ID: IDVuelo
                }
            });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.cancelarVuelo = async function (IDVuelo, callback) {
    try {
        let response = await Vuelo.update({
            Estado: 'CANCELADO'
        }, {
                where: {
                    ID: IDVuelo
                }
            });
        callback(null);
    } catch (error) {
        console.log(error);
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

controller.getEstadoVuelo = async function (ID, callback) {
    try {
        let vueloEstado = await db.query(
            "SELECT `Ruta`.`CodigoIATAOrigen`, `Vuelo`.`CodigoIATADestino`, `Vuelo`.`FechaSalida`, `Vuelo`.`Estado` " +
            "FROM `Vuelo` " +
            "INNER JOIN `Ruta` ON `Vuelo`.`IDRuta`= `Ruta`.`ID` " +
            "WHERE `Vuelo`.`ID`= " + ID + " " + 
            "AND `Vuelo`.`Activo`= 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(vueloEstado);
        callback(vueloEstado, null);
    } catch (error) {
        callback(null, error)
    }
}

controller.getAvionVuelo = async function (ID, callback) {
    try {
        let avionVuelo = await db.query(
            "SELECT `Avion`.`ID` AS AvionID, `Avion`.`IDModeloAvion`, `Avion`.`Fabricante`, `Avion`.`Estado` AS AvionE, `Avion`.`hasInternet`, `Avion`.`CantTV`, `Vuelo`.`ID` AS VueloID, `Ruta`.`CodigoIATAOrigen`, `Modelo_Avion`.`Nombre`, " +
            "`Ruta`.`CodigoIATADestino` AS RDestino, `Vuelo`.`FechaSalida`, `Vuelo`.`FechaLlegada`, `Vuelo`.`IDAvion`, `Vuelo`.`CodigoIATADestino` AS VDestino, `Vuelo`.`HoraSalida`, `Vuelo`.`HoraLlegada`, `Vuelo`.`Estado` " +
            "FROM `Vuelo` " +
            "INNER JOIN `Avion` ON `Vuelo`.`IDAvion`= `Avion`.`ID` " +
            "INNER JOIN `Ruta` ON `Vuelo`.`IDRuta`= `Ruta`.`ID` " +
            "INNER JOIN `Modelo_Avion` ON `Avion`.`IDModeloAvion`= `Modelo_Avion`.`ID` " +
            "WHERE `Vuelo`.`ID` = " + ID + " " + 
            "AND `Vuelo`.`Activo`= 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(avionVuelo);
        callback(avionVuelo, null);
    } catch (error) {
        callback(null, error)
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

controller.getVuelosAvion = async function (ID, callback) {
    try {
        let vuelosAvion = await db.query(
            "SELECT `Vuelo`.`ID`, `Ruta`.`CodigoIATAOrigen`, `Vuelo`.`CodigoIATADestino`, `Vuelo`.`FechaSalida`, `Vuelo`.`IDAvion`, `Vuelo`.`HoraSalida`, `Vuelo`.`HoraLlegada`, `Vuelo`.`Estado` " +
            "FROM `Vuelo` " +
            "INNER JOIN `Ruta` ON `Vuelo`.`IDRuta`=`Ruta`.`ID` " +
            "WHERE `Vuelo`.`IDAvion` =  '" + ID + "' " +
            "AND `Vuelo`.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(vuelosAvion);
        callback(vuelosAvion, null);
    } catch (error) {
        callback(null, error);
    }
}

controller.getSiguienteDisp =  async function (Vuelos, ClaseP, Fecha, Hora, IDCancelado, Origen, Destino, callback) {
    var siguiente = [];
    var cont = 0;
    var ID
    var clase = 'Primera Clase';
    var orig = {Fecha: '2019-03-21', Hora: '10:11:00', ID:'8'}
    var siguientes = [{ID: 4}, {ID: 10}, {ID: 9}, {ID: 5}];

    do {
        ID = Vuelos[cont].ID;
        try {
            let sig = await db.query(
            "SELECT v.ID, r.CodigoIATAOrigen AS Origen, r.CodigoIATADestino AS Destino, v.FechaSalida AS Fecha, v.HoraSalida AS Hora FROM Vuelo AS v " +
            "INNER JOIN Ruta AS r ON r.ID = v.IDRuta " +
            "INNER JOIN Avion AS a ON a.ID = v.IDAvion " +
            "INNER JOIN Modelo_Avion AS m ON m.ID = a.IDModeloAvion " +
            "WHERE TIMEDIFF('" + Fecha + " " + Hora + "', CONCAT(v.FechaSalida, ' ', v.HoraSalida)) < 0 " +
            "AND r.CodigoIATAOrigen = '" + Origen + "' " +
            "AND r.CodigoIATADestino = '" + Destino + "' " +
            "AND v.ID != " + IDCancelado + " " +
            "AND (select count(distinct(p2.ID)) from pasaje as p2 " +
            "left join vuelo as v2 on v2.ID = p2.IDVueloAbordado " +
            "inner join avion as a2 on v2.IDAvion = a2.ID " +
            "inner join modelo_avion as m2 on m2.ID = a2.IDModeloAvion " +
            "inner join tarifa as t2 on t2.ID = p2.IDTarifa " +
            "where p2.Asiento is not null " +
            "and t2.Clase = '" + ClaseP + "' " +
            "and v2.ID = " + ID + ") < IF('"+ ClaseP +"' = 'Primera Clase', m.CantAsientosPC, m.CantAsientosECO) " +
            "and v.ID = " + ID +" " +
            "ORDER BY Fecha ASC, Hora ASC " +
            "LIMIT 1;",
            { type: sequelize.QueryTypes.SELECT }
            );

            console.log(sig);

            if (sig.length > 0) {
                siguiente[0] = sig[0];
                console.log('Hola')
            }
        } catch (error) {
            console.log(error);
            callback(null, error);
        }
        cont++;
    } while ((siguiente.length < 1)&&(cont+1 != Vuelos.length));
    
    console.log(siguiente);
    callback(siguiente, null);
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

controller.getEscalas2 = async function (escalas1, data, callback) {
    var escalas = new Array(escalas1.length);
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
        do {
            try {
                escalas2 = await db.query(
                    "SELECT `Vuelo`.`ID`, `Vuelo`.`HoraSalida`, `Vuelo`.`HoraLlegada`, `Ruta`.`CodigoIATAOrigen`," +
                    " `Ruta`.`CodigoIATADestino` AS Destino, `Vuelo`.`FechaSalida`, `Vuelo`.`FechaLlegada` FROM `Vuelo`" +
                    " INNER JOIN `Ruta` ON `Ruta`.`ID` = `Vuelo`.`IDRuta`" +
                    " WHERE `Ruta`.`CodigoIATAOrigen` = '" + data.Origen + "'" +
                    " AND YEAR(`Vuelo`.`FechaSalida`) >= YEAR('" + data.FechaLlegada + "')" +
                    " AND MONTH(`Vuelo`.`FechaSalida`) >= MONTH('" + data.FechaLlegada + "')" +
                    " AND DAY(`Vuelo`.`FechaSalida`) >=  DAY('" + data.FechaLlegada + "')" +
                    " AND `Vuelo`.`Estado`='A TIEMPO'" +
                    " AND `Vuelo`.`Activo` = 1" +
                    " ORDER BY `Vuelo`.`FechaSalida` ASC LIMIT 1;",
                    { type: sequelize.QueryTypes.SELECT }
                );

                cont++;
                cont2 = 0;

                if (escalas2.length > 0) {
                    data.Origen = escalas2[0].Destino
                    data.FechaLlegada = escalas2[0].FechaLlegada
                    posicion = 0;

                    for (let k = 0; k < escalas2.length; k++) {
                        if (escalas2[k].Destino == data.Destino) {
                            data.Origen = escalas2[k].Destino
                            data.FechaLlegada = escalas2[k].FechaLlegada
                            posicion = k;
                            break;
                        }
                    }

                    origenes.push(escalas2[posicion].Origen);

                    for (let j = 0; j < origenes.length; j++) {
                        if (origenes[j] == escalas2[posicion].Destino) {
                            cont2++;
                        }
                    }

                    if (cont2 == 0) {
                        aux.push(escalas2[posicion]);
                    }

                } else {
                    posicion = 0;
                    escalas2 = [[{ Destino: '' }]]
                }
            } catch (error) {
                callback(null, error);
            }
        } while (data.Destino != escalas2[posicion].Destino && cont <= 3);

        escalas[i] = aux;
        origenes = [];
    }
    console.log(escalas);
    callback(escalas, null);
}

module.exports = controller;