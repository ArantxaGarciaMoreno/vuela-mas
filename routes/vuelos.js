const express = require("express");
const router = express.Router();
const vueloController = require("../controllers/vueloController");
const aeropuertoController = require("../controllers/aeropuertoController");
const avionController = require("../controllers/avionController");
const rutaController = require("../controllers/rutaController");

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
                                if(err) {
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

router.get("/vuelos/:ID");

module.exports = router;