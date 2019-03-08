const express = require("express");
const router = express.Router();
const tarifaController = require("../controllers/tarifaController");

router.get("/", (req, res) => {
    tarifaController.getTarifas((tarifas, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show tarifas'
            });
        else
            res.render("tarifas", { tarifas });
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        tarifaController.deleteTarifa(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete tarifa'
                });
            else
                res.redirect('/tarifas/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        tarifaController.getTarifaUpdate(req.params.ID, (tarifaUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show tarifa to update'
                });
            } else {
                tarifaController.getTarifas((tarifas, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show tarifas'
                        });
                    } else {
                        res.render("tarifas", { tarifas, tarifaUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        tarifaController.updateTarifa(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update tarifa"
                });
            else
                res.redirect("/tarifas/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        tarifaController.createTarifa(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create tarifa'
                });
            else
                res.redirect('/tarifas/');
        });
    }
});

router.get("/tarifas/:ID");

module.exports = router;