const express = require("express");
const router = express.Router();
const modeloavionController = require("../controllers/modeloavionController");

router.get("/", (req, res) => {
    modeloavionController.getModelos((modelos, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show modelos'
            });
        else
            res.render("modelos", { modelos });
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        modeloavionController.deleteModelo(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete modelo'
                });
            else
                res.redirect('/modelos/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        modeloavionController.getModeloUpdate(req.params.ID, (modeloUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show modelo to update'
                });
            } else {
                modeloavionController.getModelos((modelos, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show modelos'
                        });
                    } else {
                        res.render("modelos", { modelos, modeloUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        modeloavionController.updateModelo(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update modelo"
                });
            else
                res.redirect("/modelos/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        modeloavionController.createModelo(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create modelo'
                });
            else
                res.redirect('/modelos/');
        });
    }
});

router.get("/modelos/:ID");

module.exports = router;