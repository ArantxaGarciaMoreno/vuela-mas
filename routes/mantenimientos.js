const express = require("express");
const router = express.Router();
const mantenimientoController = require("../controllers/mantenimientoController");
const avionController = require("../controllers/avionController");

router.get("/", (req, res) => {
    mantenimientoController.getMantenimientos((mantenimientos, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show mantenimientos'
            });
        else {
            avionController.getAvionesPropios((aviones, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to show aviones'
                    });
                } else {
                    res.render('mantenimientos', { mantenimientos, aviones });
                }
            });
        }
    });
});

router.post("/delete/:IDAvion-:FechaEntrada", (req, res) => {
    if (!!req.params.IDAvion && !!req.params.FechaEntrada) {
        mantenimientoController.deleteMantenimiento(req.params, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete mantenimiento'
                });
            else
                res.redirect('/mantenimientos/');
        });

    }

});

router.get("/show/:IDAvion-:FechaEntrada", (req, res) => {
    if (!!req.params.IDAvion && !!req.params.FechaEntrada) {
        mantenimientoController.getMantenimientoUpdate(req.params, (mantenimientoUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show mantenimiento to update'
                });
            } else {
                mantenimientoController.getMantenimientos((mantenimientos, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show mantenimientos'
                        });
                    } else {
                        avionController.getAvionesPropios((aviones, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failed to show aviones'
                                });
                            } else {
                                res.render("mantenimientos", { mantenimientos, aviones, mantenimientoUpdate });
                            }
                        });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:IDAvion-:FechaEntrada", (req, res) => {
    if (!!req.body) {
        if(req.body.FechaSalida == ''){
            req.body.FechaSalida = '0001-01-01'
        }
        mantenimientoController.updateMantenimiento(req.body, req.params, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update mantenimiento"
                });
            else
                res.redirect("/mantenimientos/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        if(req.body.FechaSalida == ''){
            req.body.FechaSalida = '0001-01-01'
            avionController.updateEstadoAvion('EN REPARACIÓN', req.body.IDAvion, (err) => {
                if(err)
                    res.json({
                        success: false,
                        msg: 'Failed to update Estado Avion'
                    });
                
            });
        }
        mantenimientoController.createMantenimiento(req.body, (err) => {
            console.log(err)
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create mantenimiento'
                });
            else
                res.redirect('/mantenimientos/');
        });
    }
});

router.get("/mantenimientos/:IDAvion-:FechaEntrada");

module.exports = router;