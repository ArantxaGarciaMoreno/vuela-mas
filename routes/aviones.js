const express = require("express");
const router = express.Router();
const avionController = require("../controllers/avionController");
const modeloAvionController = require("../controllers/modeloAvionController");

router.get("/", (req, res) => {
    avionController.getAviones((aviones, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show aviones'
            });
        else {
            modeloAvionController.getModelosAvion((modelosAvion, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to show modelo de avion'
                    });
                } else {
                    res.render("aviones", { aviones, modelosAvion });
                }
            });
        }
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        avionController.deleteAvion(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete avion'
                });
            else
                res.redirect('/aviones/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        avionController.getAvionUpdate(req.params.ID, (avionUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show avion to update'
                });
            } else {
                avionController.getAviones((aviones, err) => {
                    if (err)
                        res.json({
                            success: false,
                            msg: 'Failed to show aviones'
                        });
                    else {
                        modeloAvionController.getModelosAvion((modelosAvion, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failed to show modelo de avion'
                                });
                            } else {
                                res.render("aviones", { aviones, modelosAvion, avionUpdate });
                            }
                        });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        avionController.updateAvion(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update avion"
                });
            else
                res.redirect("/aviones/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        avionController.createAvion(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create avion'
                });
            else
                res.redirect('/aviones/');
        });
    }
});

router.get("/aviones/:ID");

module.exports = router;