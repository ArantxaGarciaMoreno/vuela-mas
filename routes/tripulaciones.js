const express = require("express");
const router = express.Router();
const tripulacionController = require('../controllers/tripulacionController');
const empleadoController = require('../controllers/empleadoController');
const vueloController = require('../controllers/vueloController');

router.get("/", (req, res) => {
    tripulacionController.getTripulaciones((tripulaciones, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show tripulaciones'
            });
        else {
            empleadoController.getEmpleados((empleados, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to show empleados'
                    });
                } else {
                    vueloController.getVuelos((vuelos, err) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: 'Failed to show vuelos'
                            });
                        } else {
                            res.render("tripulaciones", { tripulaciones, empleados, vuelos });
                        }
                    });
                }
            });
        }
    });
});

router.post("/delete/:IDEmpleado/:IDVueloTrabajado", (req, res) => {
    if ((!!req.params.IDEmpleado) && (!!req.params.IDVueloTrabajado)) {
        tripulacionController.deleteTripulacion(req.params.IDEmpleado, req.params.IDVueloTrabajado, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete tripulacion'
                });
            else
                res.redirect('/tripulaciones/');
        });

    }

});

router.get("/show/:IDEmpleado/:IDVueloTrabajado", (req, res) => {
    if ((!!req.params.IDEmpleado) && (!!req.params.IDVueloTrabajado)) {
        tripulacionController.getTripulacionUpdate(req.params.IDEmpleado, req.params.IDVueloTrabajado, (tripulacionUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show tripulacion to update'
                });
            } else {
                tripulacionController.getTripulaciones((tripulaciones, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show tripulaciones'
                        });
                    } else {
                        empleadoController.getEmpleados((empleados, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failed to show empleados'
                                });
                            } else {
                                vueloController.getVuelos((vuelos, err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: 'Failed to get vuelos'
                                        });
                                    } else {
                                        res.render("tripulaciones", { tripulaciones, empleados, vuelos, tripulacionUpdate });
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

router.post("/show/:IDEmpleado/:IDVueloTrabajado/update/:IDEmpleado/:IDVueloTrabajado", (req, res) => {
    if (!!req.body) {
        tripulacionController.updateTripulacion(req.body, req.params.IDEmpleado, req.params.IDVueloTrabajado, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update tripulacion"
                });
            else
                res.redirect("/tripulaciones/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        tripulacionController.createTripulacion(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create tripulacion'
                });
            else
                res.redirect('/tripulaciones/');
        });
    }
});

router.get("/tripulaciones/:IDEmpleado/:IDVueloTrabajado");

module.exports = router;