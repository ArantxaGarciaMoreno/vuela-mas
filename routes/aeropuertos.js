const express = require("express");
const router = express.Router();
const aeropuertoController = require("../controllers/aeropuertoController");

router.get("/", (req, res) => {
    aeropuertoController.getAeropuertos((aeropuertos, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show pasajes'
            });
        else
            res.render("aeropuertos", { aeropuertos });
    });
});

router.post("/delete/:CodigoIATA", (req, res) => {
    if (!!req.params.CodigoIATA) {
        aeropuertoController.deleteAeropuerto(req.params.CodigoIATA, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete aeropuerto'
                });
            else
                res.redirect('/aeropuertos/');
        });

    }

});

router.get("/show/:CodigoIATA", (req, res) => {
    if (!!req.params.CodigoIATA) {
        aeropuertoController.getAeropuertosUpdate(req.params.CodigoIATA, (aeropuertosUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show aeropuerto to update'
                });
            } else {
                aeropuertoController.getAeropuertos((aeropuertos, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show aeropuertos'
                        });
                    } else {
                        res.render("aeropuertos", { aeropuertos, aeropuertosUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:CodigoIATA", (req, res) => {
    if (!!req.body) {
        aeropuertoController.updateAeropuerto(req.body, req.params.CodigoIATA, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update aeropuerto"
                });
            else
                res.redirect("/aeropuertos/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        aeropuertoController.createAeropuerto(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create aeropuerto'
                });
            else
                res.redirect('/aeropuertos/');
        });
    }
});

router.get("/aeropuertos/:CodigoIATA");

module.exports = router;