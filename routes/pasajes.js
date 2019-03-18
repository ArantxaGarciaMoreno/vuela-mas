const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const vueloController = require("../controllers/vueloController");
const tarifaController = require("../controllers/tarifaController");
const pasajeController = require("../controllers/pasajeController");


router.get("/", (req, res) => {
    pasajeController.getPasajes((pasajes, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show pasajes'
            });
        else {
            clienteController.getClientes((clientes, err) => {
                if (err)
                    res.json({
                        success: false,
                        msg: 'Failed to get clientes'
                    });
                else {
                    vueloController.getVuelosATiempo((vuelosAtiempo, err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: 'Failed to get vuelos a tiempo'
                            });
                        else {
                            tarifaController.getTarifas((tarifas, err) => {
                                if (err)
                                    res.json({
                                        success: false,
                                        msg: 'Failed to get tarifas'
                                    });
                                else {
                                    vueloController.getVuelosATiempoODemorados((vuelosAoD, err) => {
                                        if (err)
                                            res.json({
                                                success: false,
                                                msg: 'Failed to get vuelos a tiempo y demorados'
                                            });
                                        else {
                                            res.render("pasajes", { pasajes, clientes, vuelosAtiempo, tarifas, vuelosAoD });
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

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        pasajeController.deletePasaje(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete pasaje'
                });
            else
                res.redirect('/pasajes/');
        });

    }
});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        pasajeController.getPasajeUpdate(req.params.ID, (pasajeUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show pasaje to update'
                });
            } else {
                clienteController.getClientes((clientes, err) => {
                    if (err)
                        res.json({
                            success: false,
                            msg: 'Failed to get clientes'
                        });
                    else {
                        vueloController.getVuelosATiempo((vuelosAtiempo, err) => {
                            if (err)
                                res.json({
                                    success: false,
                                    msg: 'Failed to get vuelos a tiempo'
                                });
                            else {
                                tarifaController.getTarifas((tarifas, err) => {
                                    if (err)
                                        res.json({
                                            success: false,
                                            msg: 'Failed to get tarifas'
                                        });
                                    else {
                                        vueloController.getVuelosATiempoODemorados((vuelosAoD, err) => {
                                            if (err)
                                                res.json({
                                                    success: false,
                                                    msg: 'Failed to get vuelos a tiempo y demorados'
                                                });
                                            else {
                                                pasajeController.getPasajes((pasajes, err) => {
                                                    if(err){
                                                        res.json({
                                                            success: false,
                                                            msg: 'Failed to get pasajes'
                                                        })
                                                    }else{
                                                        res.render("pasajes", { pasajes, pasajeUpdate, clientes, vuelosAtiempo, tarifas, vuelosAoD });
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
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        pasajeController.updatePasaje(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update pasaje"
                });
            else
                res.redirect("/pasajes/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        pasajeController.createPasaje(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create pasaje'
                });
            else
                res.redirect('/pasajes/');
        });
    }
});

router.get("/pasajes/:ID");

module.exports = router;