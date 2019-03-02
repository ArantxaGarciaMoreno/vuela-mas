const express = require("express");
const router = express.Router();
const vueloProgramadoController = require("../controllers/vueloProgramadoController");
const aeropuertoController = require("../controllers/aeropuertoController");

router.get("/", (req, res) => {
    vueloProgramadoController.getVuelosProgramados((vuelosProgramados, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show vuelos'
            });
        else
            aeropuertoController.getAeropuertos((aeropuertos, err) => {
                if (err)
                    res.json({
                        success: false,
                        msg: 'Failed to get aeropuertos'
                    });
                else
                    res.render("vuelosprogramados", { vuelosProgramados, aeropuertos });
            });
    });
});

router.post("/delete/:CodigoVuelo", (req, res) => {
    if (!!req.params.CodigoVuelo) {
        vueloProgramadoController.deleteVueloProgramado(req.params.CodigoVuelo, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete vuelo programado'
                });
            else
                res.redirect('/vuelosprogramados/');
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        vueloProgramadoController.createVueloProgramado(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create vuelo programado'
                });
            else
                res.redirect('/vuelosprogramados/');
        });
    }
});

router.get("/vuelosprogramados/:CodigoVuelo");

module.exports = router;