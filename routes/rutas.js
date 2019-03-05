const express = require("express");
const router = express.Router();
const rutaController = require("../controllers/rutaController");

router.get("/", (req, res) => {
    rutaController.getRutas((rutas, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show ruta'
            });
        else
            res.render("rutas", { rutas });
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        rutaController.deleteRuta(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete ruta'
                });
            else
                res.redirect('/rutas/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        rutaController.getRutaUpdate(req.params.ID, (rutaUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show ruta to update'
                });
            } else {
                rutaController.getRutas((rutas, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show rutas'
                        });
                    } else {
                        res.render("rutas", { rutas, rutaUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        rutaController.updateRuta(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update ruta"
                });
            else
                res.redirect("/rutas/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        rutaController.createRuta(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create ruta'
                });
            else
                res.redirect('/rutas/');
        });
    }
});

router.get("/rutas/:ID");

module.exports = router;