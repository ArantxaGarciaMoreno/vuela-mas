const express = require('express');
const router = express.Router();
const aeropuertoController = require("../controllers/aeropuertoController");
const vueloController = require("../controllers/vueloController");
const pasajeController = require("../controllers/pasajeController");
const avionController = require("../controllers/avionController");
const rutaController = require("../controllers/rutaController");

router.get("/", (req, res) => {
    aeropuertoController.getAeropuertos((aeropuertos, err) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to show aeropuertos'
            });
        } else {
            pasajeController.getPasajesCheckIn((pasajesCheckIn, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to get pasajesCheckIn'
                    });
                } else {
                    vueloController.getVuelosR((vuelos, err) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: 'Failed to get vuelos'
                            });
                        } else {
                            aeropuertoController.getAeropuertosTop((top, err) => {
                                if (err) {
                                    console.log(err);
                                    res.json({
                                        success: false,
                                        msg: "Failed to get top"
                                    });
                                } else {
                                    pasajeController.getCancelado((cancelados, err) => {
                                        if (err) {
                                            console.log(err);
                                            res.json({
                                                success: false,
                                                msg: "Failed to get boletos cancelados"
                                            });
                                        } else {
                                            console.log(cancelados);
                                            res.render("index", { aeropuertos, vuelos, pasajesCheckIn, top, cancelados })
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

router.post("/checkin", (req, res) => {
    if(!!req.body) {
        pasajeController.getCheckIn(req.body, (pasajeR, err) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "Failed to get pasaje"
                });
            } else {
                vueloController.getVueloCheckin(req.body, (vueloR, err) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: "Failed to load vuelo"
                        });
                    } else {
                        res.render("index", {pasajeR, vueloR});
                    }
                });
            }
        });
    }
});

router.post("/vuelo-cancelado/", (req, res) => {
    if(!!req.body) {
        console.log(req.body);
        var boleto = JSON.parse(req.body.Cancelado);
        console.log(boleto);
        res.render("index", {boleto})    
    }
});

router.post("/vuelo-cancelado/cancelar-boleto/:ID", (req, res) => {
    if(!!req.params) {
        pasajeController.deletePasaje(req.params.ID, (error) => {
            if(error) {
                console.log(error);
                res.json({
                    success: false,
                    msg: "Failed to calce pasaje"
                });
            } else {
                res.redirect("/");
            }
        })
    }
});

router.get("/vuelo-cancelado/siguiente-vuelo/:IDCancelado/:Clase/:Fecha/:Hora/:Origen/:Destino/:IDBoleto", (req, res) => {
    if(!!req.params) {
        vueloController.getVueloDestino(req.params.IDCancelado, req.params.Fecha, req.params.Hora, req.params.Origen, req.params.Destino, (vuelos, err) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "Failed to get vuelos"
                });
            } else {
                vueloController.getSiguienteDisp(vuelos, req.params.Clase, req.params.Fecha, req.params.Hora, req.params.IDCancelado, (siguiente, err) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: "Failed to get siguiente vuelo disponible"
                        });
                    } else {
                        res.render("index", {siguiente});
                    }
                });
            }
        });
    }
});

router.post("/vuelo-cancelado/siguiente-vuelo/:IDCancelado/:Clase/:Fecha/:Hora/:Origen/:Destino/:IDBoleto/confirm/:Siguiente/", (req, res) => {
    if(!!req.params) {
        pasajeController.vueloReasignado(req.params.IDBoleto, req.params.Siguiente, (error) => {
            if(error) {
                console.log(error);
                res.json({
                    success: false,
                    msg: "Failed to reasign vuelo"
                });
            } else {
                res.redirect("/pasajes/");
            }
        });
    }
});

router.get("/checkin/confirm/:ID/:Flight", (req, res) => {
    if(!!req.body){
        avionController.getAsientos(req.params.Flight, (asientos, err) => {
            if(err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "Failed to get vuelo"
                });
            } else {
                pasajeController.getCheckedInE(req.params.Flight, (ocupadosE, err) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: "Failed to get asientos ocupados economica"
                        });
                    } else {
                        pasajeController.getClase(req.params.ID, (cliente, err) => {
                            if (err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: 'Failed to get pasaje'
                                });
                            } else {
                                pasajeController.getCheckedInPC(req.params.Flight, (ocupadosPC, err) => {
                                    if (err) {
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            msg: "Failed to get asientos ocupados primera clase"
                                        });
                                    } else {
                                        var asientosPC = [];
                                        var asientosE = [];

                                        for (var i = 0; i < asientos[0].AsientosPC; i++) {
                                            for(var j = 0; j < ocupadosPC.length; j++) {
                                                if((ocupadosPC[j].Ocupado == (i+1))) {
                                                    asientosPC.push([(i+1), "Ocupado"]);
                                                } else {
                                                    if(ocupadosPC[j].Ocupado > i+1){
                                                        if(asientosPC.length < (i+1)){
                                                            asientosPC.push([(i+1), "Libre"]);
                                                        }
                                                    }
                                                }
                                            }
                                            if(asientosPC.length < (i+1)) {
                                                asientosPC.push([(i+1), "Libre"]);
                                            }
                                        }

                                        for (var i = 0; i < asientos[0].AsientosE; i++) {
                                            for(var j = 0; j < ocupadosE.length; j++) {
                                                if((ocupadosE[j].Ocupado == (i+1))) {
                                                    asientosE.push([(i+1), "Ocupado"]);
                                                } else {
                                                    if(ocupadosE[j].Ocupado > i+1){
                                                        if(asientosE.length < (i+1)){
                                                            asientosE.push([(i+1), "Libre"]);
                                                        }
                                                    }
                                                }
                                            }
                                            if(asientosE.length < (i+1)) {
                                                asientosE.push([(i+1), "Libre"]);
                                            }
                                        }

                                        console.log(asientosPC);
                                        console.log(asientosE);

                                        res.render("index", {asientos, asientosE, asientosPC, cliente});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

router.get("/checkin/select-flight/:ID/:Flight", (req, res) => {
    if(!!req.body) {
        vueloController.getVuelo(req.params.Flight, (vuelo, err) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "Failed to get vuelo"
                });
            } else {
                rutaController.getRuta(vuelo.IDRuta, (ruta, err) => {
                    if (err) {
                        console.log(err);
                        msg: "Failed to get ruta"
                    } else {
                        vueloController.getVueloDestino(vuelo.ID, vuelo.FechaSalida, vuelo.HoraSalida, ruta.CodigoIATAOrigen, ruta.CodigoIATADestino, (nuevoVuelo, err) => {
                            if(err) {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: "Failed to get vuelos"
                                });
                            } else {
                                var pasajeND = req.params.ID;
                                res.render("index", {nuevoVuelo, pasajeND});
                            }
                        });
                    }
                });
            }
        });
    }
});

router.post("/checkin/confirm/:ID/:Flight/get-seat", (req, res) => {
    if(!!req.body) {
        pasajeController.reservarAsiento(req.params.ID, req.params.Flight, req.body, (err) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "Failed to update asiento"
                });
            } else {
                res.redirect("/pasajes/");
            }
        });
    }
});

router.post("/consultarEstado", (req, res) => {
    if(!!req.body) {
        vueloController.getEstadoVuelo(req.body.Vuelo, (vueloEstado, error)=> {
            if(error) {
                res.json({
                    success: false,
                    msg: 'Failed to get Estado'
                });
            } else {
                res.render('index', { vueloEstado });
            }
        })
    }
})

router.post("/consultarAvion", (req, res) => {
    if(!!req.body) {
        vueloController.getAvionVuelo(req.body.VueloA, (avionVuelo, error)=> {
            if(error) {
                console.log(error);
                res.json({
                    success: false,
                    msg: 'Failed to get Avion'
                });
            } else {
                res.render('index', { avionVuelo });
            }
        })
    }
})

router.post("/buscarOfertas", (req, res) => {
    if (!!req.body) {
        vueloController.getOfertasVuelos(req.body, (ofertasVuelos, error) => {
            if (error) {
                console.log(error)
                res.json({
                    success: false,
                    msg: 'Failed to show ofertas'
                });
            } else
                if (ofertasVuelos.length > 0) {
                    res.render("index", { ofertasVuelos });
                } else {
                    vueloController.getEscalas1(req.body, (escalas1, error) => {
                        if (error) {
                            res.json({
                                success: false,
                                msg: 'Failed to show primera escala'
                            });
                        } else {
                            var data = { Origen: '', Destino: req.body.Destino, FechaLlegada: '' }
                            vueloController.getEscalas2(escalas1, data, (escalas, error) => {
                                if (error) {
                                    res.json({
                                        success: false,
                                        msg: 'Failed to get escalas'
                                    });
                                } else {
                                    var escalasOfertadas = [];
                                    for (let i = 0; i < escalas.length; i++) {
                                        if (escalas[i][(escalas[i].length - 1)].Destino == req.body.Destino) escalasOfertadas.push(escalas[i])
                                    }
                                    res.render('index', { escalasOfertadas });
                                }
                            });
                        }
                    });
                }
        });
    }
});

router.get("/checkin");


module.exports = router;