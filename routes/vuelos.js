const express = require("express");
const router = express.Router();
const vueloController = require("../controllers/vueloController");

router.get("/", (req, res) => {
    vueloController.getVuelos((vuelos, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show vuelo'
            });
        else
            res.render("vuelos", { vuelos });
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        vueloController.deleteVuelo(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete Vuelo'
                });
            else
                res.redirect('/vuelos/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        vueloController.getVueloUpdate(req.params.ID, (vueloUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show Vuelo to update'
                });
            } else {
                vueloController.getVuelos((vuelos, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show vuelos'
                        });
                    } else {
                        res.render("vuelos", { vuelos, vueloUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        vueloController.updateVuelo(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update Vuelo"
                });
            else
                res.redirect("/vuelos/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        vueloController.createVuelo(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create Vuelo'
                });
            else
                res.redirect('/vuelos/');
        });
    }
});

router.get("/vuelos/:ID");

module.exports = router;