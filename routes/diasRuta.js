const express = require("express");
const router = express.Router();
const diasRutaController = require("../controllers/diasRutaController");
const rutaController = require("../controllers/rutaController");

router.get("/", (req, res) => {
    diasRutaController.getDiasRuta((diasRuta, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show dias ruta'
            });
        else {
            rutaController.getRutas((rutas, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to show rutas'
                    });
                } else {
                    res.render("diasRuta", { diasRuta, rutas });
                }
            });
        }
    });
});

router.post("/delete/:IDRuta/:DiaSemana", (req, res) => {
    if ((!!req.params.IDRuta)&&(!!req.params.DiaSemana)) {
        diasRutaController.deleteCliente(req.params.IDRuta, req.params.DiaSemana, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete dias ruta'
                });
            else
                res.redirect('/diasRuta/');
        });

    }

});

router.get("/show/:IDRuta/:DiaSemana", (req, res) => {
    if ((!!req.params.IDRuta)&&(!!req.params.DiaSemana)) {
        diasRutaController.getDiasRutateUpdate(req.params.IDRuta, req.params.DiaSemana, (diaRutaUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show dia ruta to update'
                });
            } else {
                diasRutaController.getDiasRuta((diasRuta, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show diasRuta'
                        });
                    } else {
                        rutaController.getRutas((rutas, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failed to show rutas'
                                });
                            } else {
                                res.render("diasRuta", { diasRuta, rutas, diaRutaUpdate });
                            }
                        });
                    }
                });
            }
        });
    }
});

router.post("/show/:IDRuta/:DiaSemana/update/:IDRuta/:DiaSemana", (req, res) => {
    if (!!req.body) {
        diasRutaController.updateDiasRuta(req.body, req.params.IDRuta, req.params.DiaSemana, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update cliente"
                });
            else
                res.redirect("/diasRuta/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        diasRutaController.createDiasRuta(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create cliente'
                });
            else
                res.redirect('/diasRuta/');
        });
    }
});

router.get("/diasRuta/:IDRuta/:DiaSemana");

module.exports = router;