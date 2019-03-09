const express = require("express");
const router = express.Router();
const rutaController = require("../controllers/rutaController");
const aeropuertoController = require("../controllers/aeropuertoController");
const avionController = require("../controllers/avionController");

router.get("/", (req, res) => {
    rutaController.getRutas((rutas, err) => {
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
                    avionController.getAviones((aviones, err) => {
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
        rutaController.getRutaUpdate(req.params.ID, (rutaUpdate, err) => {
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
                        avionController.getAviones((aviones, err) => {
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
        rutaController.updateRuta(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update ruta"
                });
            else
                res.redirect("/rutas/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        rutaController.createRuta(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create ruta'
                });
            else
                res.redirect('/rutas/');
        });
    }
});

router.get("/rutas/:ID");

module.exports = router;