const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.get("/", (req, res) => {
    clienteController.getClientes((clientes, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show clientes'
            });
        else
            res.render("clientes", { clientes });
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        clienteController.deleteCliente(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete CLIENTE'
                });
            else
                res.redirect('/clientes/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        clienteController.getClienteUpdate(req.params.ID, (clienteUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show cliente to update'
                });
            } else {
                clienteController.getClientes((clientes, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show clientes'
                        });
                    } else {
                        res.render("clientes", { clientes, clienteUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        clienteController.updateCliente(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update cliente"
                });
            else
                res.redirect("/clientes/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        clienteController.createCliente(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create cliente'
                });
            else
                res.redirect('/clientes/');
        });
    }
});

router.get("/clientes/:ID");

module.exports = router;