const express = require("express");
const router = express.Router();
const telefonoController = require('../controllers/telefonoController');

router.get("/", (req, res) => {
    telefonoController.getTelefonos((telefonos, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show telefonos'
            });
        else
            res.render("telefonos", { telefonos });
    });
});

router.post("/delete/:IDPersona", (req, res) => {
    if (!!req.params.IDPersona) {
        telefonoController.deleteTelefono(req.params.IDPersona, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete tarifa'
                });
            else
                res.redirect('/telefonos/');
        });

    }

});

router.get("/show/:IDPersona", (req, res) => {
    if (!!req.params.IDPersona) {
        telefonoController.getTelefonoUpdate(req.params.IDPersona, (tarifaUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show tarifa to update'
                });
            } else {
                telefonoController.getTelefonos((telefonos, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show telefonos'
                        });
                    } else {
                        res.render("telefonos", { telefonos, tarifaUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:IDPersona", (req, res) => {
    if (!!req.body) {
        telefonoController.updateTelefono(req.body, req.params.IDPersona, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update tarifa"
                });
            else
                res.redirect("/telefonos/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        telefonoController.createTelefono(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create tarifa'
                });
            else
                res.redirect('/telefonos/');
        });
    }
});

router.get("/telefonos/:IDPersona");

module.exports = router;