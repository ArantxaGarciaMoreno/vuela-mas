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

router.post("/delete/:IDProveedor/:IDAvion/:FechaSolicitud", (req, res) => {
    if ((!!req.params.IDProveedor)&&(!!req.params.IDAvion)&&(!!req.params.FechaSolicitud)) {
        alquilerController.deleteAlquiler(req.params.IDProveedor, req.params.IDAvion, req.params.FechaSolicitud, (err) => {
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

router.get("/show/:IDProveedor/:IDAvion/:FechaSolicitud", (req, res) => {
    if ((!!req.params.IDProveedor)&&(!!req.params.IDAvion)&&(!!req.params.FechaSolicitud)) {
        alquilerController.getAlquilerUpdate(req.params.IDProveedor, req.params.IDAvion, req.params.FechaSolicitud, (alquilerUpdate, err) => {
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

router.post("/show/:IDProveedor/:IDAvion/:FechaSolicitud/update/:IDProveedor/:IDAvion/:FechaSolicitud", (req, res) => {
    if (!!req.body) {
        alquilerController.updateAlquiler(req.body, req.params.IDProveedor, req.params.IDAvion, req.params.FechaSolicitud, (err) => {
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

router.get("/alquileres/:IDProveedor/:IDAvion/:FechaSolicitud");

module.exports = router;