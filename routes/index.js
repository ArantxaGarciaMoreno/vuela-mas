const express = require('express');
const router = express.Router();
const aeropuertoController = require("../controllers/aeropuertoController");
const vueloController = require("../controllers/vueloController");

router.get("/", (req, res) => {
    aeropuertoController.getAeropuertos((aeropuertos, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show aeropuertos'
            });
        else
            vueloController.getVuelosR((vuelos, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to get vuelos'
                    });
                } else {
                    res.render("index", { aeropuertos, vuelos });
                }
            })

    });
});

router.post("/consultarEstado", (req, res) => {
    if(!!req.body) {
        vueloController.getEstadoVuelo(req.body.Vuelo, (vueloEstado, error)=> {
            if(error) {
                res.json({
                    success: false,
                    msg: 'Failed to get Estado'
                });
            } else {
                res.render('index', { vueloEstado });
            }
        })
    }
})

router.post("/buscarOfertas", (req, res) => {
    if (!!req.body) {
        vueloController.getOfertasVuelos(req.body, (ofertasVuelos, error) => {
            if (error) {
                console.log(error)
                res.json({
                    success: false,
                    msg: 'Failed to show ofertas'
                });
            } else
                if (ofertasVuelos.length > 0) {
                    res.render("index", { ofertasVuelos });
                } else {
                    vueloController.getEscalas1(req.body, (escalas1, error) => {
                        if (error) {
                            res.json({
                                success: false,
                                msg: 'Failed to show primera escala'
                            });
                        } else {
                            var data = { Origen: '', Destino: req.body.Destino, FechaLlegada: '' }
                            vueloController.getEscalas2(escalas1, data, (escalas, error) => {
                                if (error) {
                                    res.json({
                                        success: false,
                                        msg: 'Failed to get escalas'
                                    });
                                } else {
                                    var escalasOfertadas = [];
                                    for (let i = 0; i < escalas.length; i++) {
                                        if (escalas[i][(escalas[i].length - 1)].Destino == req.body.Destino) escalasOfertadas.push(escalas[i])
                                    }
                                    res.render('index', { escalasOfertadas });
                                }
                            });
                        }
                    });
                }
        });
    }
});

router.get("/buscarOfertas");

module.exports = router;