const express = require("express");
const router = express.Router();
const pasajeController = require("../controllers/pasajeController");
const clienteController = require ("../controllers/clienteController");

router.get("/", (req, res) => {
    pasajeController.getPasajes((pasajes, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show pasajes'
            });
        else
        clienteController.getClientes((clientes, err) => {
            if (err)
            res.json({
                success: false,
                msg: 'Failed to show clientes'
            });
            else
            res.render("index", { pasajes, clientes });
        });
    });

    /*clienteController.getClientes((clientes, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show clientes'
            });
        else
            res.render("index", { clientes });
    });
    
    Buggy, probar luego
    */
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

/*router.post("/create/pasaje", (req, res) => {
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
});*/

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
            clienteController.createCliente(req.body, (err) => {
                if (err)
                    res.json({
                        success: false,
                        msg: 'Failed to create cliente'
                    });
                else
                    res.redirect('/');
            });
        });  
    }
});

/*router.post("/create/cliente", (req, res) => {
    console.log(req.body);
    if (!!req.body) {
        clienteController.createCliente(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create cliente'
                });
            else
                res.redirect('/');
        });  
    }
});*/

router.get("/:Reserva");

module.exports = router;