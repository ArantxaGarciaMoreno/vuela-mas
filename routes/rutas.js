const express = require("express");
const router = express.Router();
const rutaController = require("../controllers/rutaController");
const aeropuertoController = require("../controllers/aeropuertoController");
const avionController = require("../controllers/avionController");
const diasRutaController = require("../controllers/diasRutaController");

router.get("/", (req, res) => {
    rutaController.getRutaZA((rutas, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show ruta'
            });
        else {
            aeropuertoController.getAeropuertos((aeropuertos, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to show aeropuertos'
                    });
                } else {
                    avionController.getAvionesPropios((aviones, err) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: 'Failed to show aviones'
                            });
                        } else {
                            res.render("rutas", { rutas, aeropuertos, aviones });
                        }
                    });
                }
            });
        }
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        rutaController.deleteRuta(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete ruta'
                });
            else
                res.redirect('/rutas/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        rutaController.getRutaZAUpdate(req.params.ID, (rutaUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show ruta to update'
                });
            } else {
                rutaController.getRutas((rutas, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show rutas'
                        });
                    } else {
                        avionController.getAvionesPropios((aviones, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failed to show aviones'
                                });
                            } else {
                                aeropuertoController.getAeropuertos((aeropuertos, err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: 'Failed to show aeropuertos'
                                        });
                                    } else {
                                        res.render("rutas", { rutas, aeropuertos, aviones, rutaUpdate });
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
        if (req.body.CodigoIATAOrigen != req.body.CodigoIATADestino) {
            rutaController.updateRuta(req.body, req.params.ID, (err) => {
                if (err)
                    res.json({
                        success: false,
                        msg: "Failed to update ruta"
                    });
                else
                    res.redirect("/rutas/");
            });
        } else {
            res.json({
                success: false,
                msg: 'CodigoIATAOrigen and CodigoIATADestino must be different'
            });
        }
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        if (req.body.CodigoIATAOrigen != req.body.CodigoIATADestino) {
            rutaController.createRuta(req.body, (err) => {
                if (err)
                    res.json({
                        success: false,
                        msg: 'Failed to create ruta'
                    });
                else
                    avionController.updateEstadoAvion('EN RUTA', req.body.IDAvion, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: 'Failed to update estado avion'
                            });
                        else
                        res.redirect('/rutas/');
                    });
                    
            });
        } else {
            res.json({
                success: false,
                msg: 'CodigoIATAOrigen and CodigoIATADestino must be different'
            });
        }
    }
});

router.get("/dias/:IDRuta", (req, res) => {
    if (!!req.params.IDRuta) {
        diasRutaController.getDiasRuta(req.params.IDRuta, (diasRuta, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show dias'
                });
            } else {
                rutaController.getRuta(req.params.IDRuta, (ruta, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show ruta'
                        });
                    } else {
                        res.render("rutas", { diasRuta, ruta });
                    }
                });
            }
        });
    }
});

router.post("/dias/agregarDia", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        diasRutaController.createDiasRuta(req.body, (err) => {
            if (err) {
                console.log(err)
                res.json({
                    success: false,
                    msg: 'Failed to agregar dia'
                });
            }
            else
                res.redirect(`/rutas/dias/${req.body.IDRuta}`);
        });
    }
});

router.post("/dias/deleteDia/:IDRuta-:DiaSemana", (req, res) => {
    if (!!req.params.IDRuta && !!req.params.DiaSemana) {
        diasRutaController.deleteDiasRuta(req.params, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete dia'
                });
            else
                res.redirect(`/rutas/dias/${req.params.IDRuta}`);
        });

    }

});
router.get("/rutas/:ID");

module.exports = router;