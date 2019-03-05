const express = require("express");
const router = express.Router();
const modeloAvionController = require("../controllers/modeloAvionController");

router.get("/", (req, res) => {
    modeloAvionController.getModelosAvion((modelosAvion, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show modelos de avion'
            });
        else
            res.render("modelosAvion", { modelosAvion });
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        modeloAvionController.deleteModeloAvion(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete modelo de avion'
                });
            else
                res.redirect('/modelosAvion/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        modeloAvionController.getModeloAvionUpdate(req.params.ID, (modeloAvionUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show modelo de avion to update'
                });
            } else {
                modeloAvionController.getModelosAvion((modelosAvion, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show modelos de avion'
                        });
                    } else {
                        res.render("modelosAvion", { modelosAvion, modeloAvionUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        modeloAvionController.updateModeloAvion(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update modelo de avion"
                });
            else
                res.redirect("/modelosAvion/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        modeloAvionController.createModeloAvion(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create modelo de avion'
                });
            else
                res.redirect('/modelosAvion/');
        });
    }
});

router.get("/modelosAvion/:ID");

module.exports = router;