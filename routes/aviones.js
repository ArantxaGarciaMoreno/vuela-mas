const express = require("express");
const router = express.Router();
const avionController = require("../controllers/avionController");
const alquilerController = require("../controllers/alquilerController");
const modeloAvionController = require("../controllers/modeloAvionController");
const proveedorController = require("../controllers/proveedorController");
const vueloController = require("../controllers/vueloController");

router.get("/", (req, res) => {
    avionController.getAviones((aviones, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show aviones'
            });
        else {
            modeloAvionController.getModelosAvion((modelosAvion, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to show modelo de avion'
                    });
                } else {
                    res.render("aviones", { aviones, modelosAvion });
                }
            });
        }
    });
});

router.get("/detalle/:ID", (req, res) => {
    if(!!req.params.ID) {
        alquilerController.getAvionAlquiler(req.params.ID, (alquileres, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to get detalle de alquiler'
                });
            } else {
                avionController.getAvionUpdate(req.params.ID, (avion, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to get avion'
                        });
                    } else {
                        modeloAvionController.getModelosAvion((modelosAvion, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failed to get modelos avion'
                                });
                            } else {
                                proveedorController.getProveedores((proveedores, err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: 'Failed to get proveedores'
                                        });
                                    } else {
                                        res.render("aviones", {alquileres, avion, modelosAvion, proveedores});
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

router.get("/uso/:ID", (req, res) => {
    if(!!req.params.ID) {
        vueloController.getVuelosAvion(req.params.ID, (vuelosAvion, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to get vuelos en los que fue usado y sera usado el avion'
                });
            } else {
                res.render("aviones", {vuelosAvion});
            }
        });
    }
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        avionController.deleteAvion(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete avion'
                });
            else
                res.redirect('/aviones/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        avionController.getAvionUpdate(req.params.ID, (avionUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show avion to update'
                });
            } else {
                avionController.getAviones((aviones, err) => {
                    if (err)
                        res.json({
                            success: false,
                            msg: 'Failed to show aviones'
                        });
                    else {
                        modeloAvionController.getModelosAvion((modelosAvion, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failed to show modelo de avion'
                                });
                            } else {
                                res.render("aviones", { aviones, modelosAvion, avionUpdate });
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
        avionController.updateAvion(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update avion"
                });
            else
                res.redirect("/aviones/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        avionController.createAvion(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create avion'
                });
            else
                res.redirect('/aviones/');
        });
    }
});

router.get("/aviones/:ID");

module.exports = router;