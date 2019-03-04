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
        aeropuertoController.destroyAeropuerto(req.params.CodigoIATA, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete pasaje'
                });
            else
            res.redirect('/aeropuertos/');
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