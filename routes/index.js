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

module.exports = router;