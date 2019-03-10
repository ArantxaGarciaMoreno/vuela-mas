const express = require("express");
const router = express.Router();
const alquilerController = require("../controllers/alquilerController");

router.get("/", (req, res) => {
    alquilerController.getAlquileres((alquileres, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show alquileres'
            });
        else
            res.render("alquileres", { alquileres });
    });
});

router.post("/delete/:IDProveedor_:IDAvion", (req, res) => {
    if (!!req.params.CodigoIATA) {
        alquilerController.deleteAlquiler(req.params.IDProveedor, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete alquiler'
                });
            else
                res.redirect('/alquileres/');
        });

    }

});

router.get("/show/:IDProveedor_:IDAvion", (req, res) => {
    if (!!req.params.IDProveedor) {
        alquilerController.getAlquilerUpdate(req.params.IDProveedor, (alquilerUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show alquiler to update'
                });
            } else {
                alquilerController.getAlquileres((alquileres, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show alquileres'
                        });
                    } else {
                        res.render("alquileres", { alquileres, alquilerUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:IDProveedor_:IDAvion", (req, res) => {
    if (!!req.body) {
        alquilerController.updateAeropuerto(req.body, req.params.IDProveedor, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update alquiler"
                });
            else
                res.redirect("/alquileres/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        alquilerController.createAlquiler(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create alquiler'
                });
            else
                res.redirect('/alquileres/');
        });
    }
});

router.get("/alquileres/:IDProveedor_:IDAvion");

module.exports = router;