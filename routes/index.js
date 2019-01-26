const express = require("express");
const router = express.Router();
const pasajeController = require("../controllers/pasajeController");

router.get("/", (req, res) => {
    pasajeController.getPasajes((pasajes, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show pasajes'
            });
        else
            res.render("index", { pasajes });
    });
});

router.post("/delete/:Reserva", (req, res) => {
    if (!!req.params.Reserva) {
        pasajeController.deletePasaje(req.params.Reserva, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete pasaje'
                });
            else
                res.redirect('/');
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        pasajeController.createPasaje(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create pasaje'
                });
            else
                res.redirect('/');
        });
    }
});

router.get("/:Reserva");

module.exports = router;