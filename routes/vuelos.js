const express = require("express");
const router = express.Router();
const vueloController = require("../controllers/vueloController");
const aeropuertoController = require("../controllers/aeropuertoController");
const avionController = require("../controllers/avionController");
const rutaController = require("../controllers/rutaController");
const empleadoController = require("../controllers/empleadoController");
const tripulacionController = require("../controllers/tripulacionController");
const desvioController = require("../controllers/desvioController");

router.get("/", (req, res) => {
    vueloController.getVuelos((vuelos, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show vuelo'
            });
        else {
            aeropuertoController.getAeropuertos((aeropuertos, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to show aeropuertos'
                    });
                } else {
                    avionController.getAviones((aviones, err) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: 'Failed to show aviones'
                            });
                        } else {
                            rutaController.getRutas((rutas, err) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: 'Failed to show rutas'
                                    });
                                } else {
                                    res.render("vuelos", { vuelos, aeropuertos, aviones, rutas });
                                }
                            });
                        }
                    });
                }
            });
        }

    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        vueloController.deleteVuelo(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete Vuelo'
                });
            else
                res.redirect('/vuelos/');
        });

    }

});

router.post("/cancelar/:ID", (req, res) => {
    if(!!req.params.ID) {
        vueloController.cancelarVuelo(req.params.ID, (err) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: 'Failed to calcel vuelo'
                });
            } else {
                res.redirect("/vuelos/");
            }
        });
    }
});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        vueloController.getVueloUpdate(req.params.ID, (vueloUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show Vuelo to update'
                });
            } else {
                vueloController.getVuelos((vuelos, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show vuelos'
                        });
                    } else {
                        aeropuertoController.getAeropuertos((aeropuertos, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failes to show aeropuertos'
                                });
                            } else {
                                avionController.getAviones((aviones, err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: 'Failed to show aviones'
                                        });
                                    } else {
                                        rutaController.getRutas((rutas, err) => {
                                            if (err) {
                                                res.json({
                                                    success: false,
                                                    msg: 'Failed to show rutas'
                                                });
                                            } else {
                                                res.render("vuelos", { vuelos, aeropuertos, aviones, rutas, vueloUpdate });
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
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        vueloController.updateVuelo(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update Vuelo"
                });
            else
                res.redirect("/vuelos/");
        });
    }
});

router.get("/desviar", (req, res) => {
    if (!!req.body) {
        desvioController.getDesvios((desvios, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to get desvios'
                });
            } else {
                vueloController.getVuelosEnRuta((enRuta, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to get vuelos en ruta'
                        });
                    } else {
                        res.render("vuelos", {desvios, enRuta});
                    }
                });
            }
        });
    }
});

router.post("/desviar/confirm/:ID/:Destino/:Llegada", (req, res) => {
    if (!!req.body) {
        desvioController.deleteDesvio(req.params.ID, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to confirm desvio'
                });
            } else {
                vueloController.desviarVuelo(req.params.ID, req.params.Destino, req.params.Llegada, (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to desviar vuelo'
                        });
                    } else {
                        res.redirect("/vuelos/desviar/")
                    }
                });
            }
        });
    }
});

router.post("/desviar/cancel/:ID/", (req, res) => {
    if(!!req.body) {
        desvioController.destroyDesvio(req.params.ID, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to destroy desvio'
                });
            } else {
                res.redirect("/vuelos/desviar/");
            }
        });
    }
});

router.get("/desviar/show/:ID/:Destino", (req, res) => {
    if (!!req.body) {
        desvioController.getDesvios((desvios, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to get desvios'
                });
            } else {
                vueloController.getVuelosEnRuta((enRuta, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to get vuelos en ruta'
                        });
                    } else {
                        vueloController.getVueloUpdate(req.params.ID, (vueloDesvio, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failed to get vueloDesvio'
                                });
                            } else {
                                aeropuertoController.getAeropuertosDistintos(req.params.Destino, (diferentes, err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: 'Failed to get aeropuertos diferentes'
                                        });
                                    } else {
                                        res.render("vuelos", {desvios, enRuta, vueloDesvio, diferentes});
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

router.post("/desviar/show/:ID/add", (req,res) => {
    if(!!req.body) {
        desvioController.createDesvio(req.body, req.params.ID, (err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to add desvio'
                });
            } else {
                res.redirect('/vuelos/desviar/');
            }
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        vueloController.createVuelo(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create Vuelo'
                });
            else
                res.redirect('/vuelos/');
        });
    }
});

router.get("/tripulacion/:IDVueloTrabajado", (req, res) => {
    if (!!req.params.IDVueloTrabajado) {
        tripulacionController.getTripulacion(req.params.IDVueloTrabajado, (tripulacion, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show tripulacion'
                });
            } else {
                vueloController.getVuelo(req.params.IDVueloTrabajado, (vuelo, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show vuelo'
                        });
                    } else {
                        rutaController.getRuta(vuelo.IDRuta, (ruta, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failes to show ruta'
                                });
                            } else {
                                aeropuertoController.getAeropuerto(vuelo.CodigoIATADestino, (aeropuerto,err)=>{
                                    if(err) {
                                        res.json({
                                            success: false,
                                            msg: 'Failes to show aeropuerto'
                                        });
                                    }else{
                                        empleadoController.getEmpleadosTripulacion((empleados,err)=>{
                                            if(err){
                                                console.log(err)
                                                res.json({
                                                    success: false,
                                                    msg: 'Failed to show empleados'
                                                });
                                            }else{
                                                res.render("vuelos", { tripulacion, vuelo, ruta, aeropuerto, empleados });
                                            }
                                        })
                                        
                                    }
                                })
                                
                            }
                        });
                    }
                });
            }
        });
    }
});

router.post("/tripulacion/agregarTripulacion", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        tripulacionController.createTripulacion(req.body, (err) => {
            if (err) {
                console.log(err)
                res.json({
                    success: false,
                    msg: 'Failed to agregar tripulacion'
                });
            }
            else
                res.redirect(`/vuelos/tripulacion/${req.body.IDVueloTrabajado}`);
        });
    }
});

router.post("/tripulacion/deleteTripulacion/:IDEmpleado-:IDVueloTrabajado", (req, res) => {
    if (!!req.params.IDEmpleado && !!req.params.IDVueloTrabajado) {
        tripulacionController.deleteTripulacion(req.params.IDEmpleado, req.params.IDVueloTrabajado, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete tripulacion'
                });
            else
                res.redirect(`/vuelos/tripulacion/${req.params.IDVueloTrabajado}`);
        });

    }

});

router.get("/vuelos/:ID");

module.exports = router;