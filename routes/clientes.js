const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const telefonosClientesController = require("../controllers/telefonosClientesController");


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

router.get("/telefonos/:IDCliente", (req, res) => {
    if (!!req.params.IDCliente) {
        telefonosClientesController.getTelefonos(req.params.IDCliente, (telefonos, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show telefonos'
                });
            } else {
                clienteController.getCliente(req.params.IDCliente, (cliente, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show cliente'
                        });
                    } else {
                        res.render("clientes", { telefonos, cliente });
                    }
                });
            }
        });
    }
});

router.post("/telefonos/agregarTelefono", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        telefonosClientesController.createTelefono(req.body, (err) => {
            if (err) {
                console.log(err)
                res.json({
                    success: false,
                    msg: 'Failed to agregar telefono'
                });
            }
            else
                res.redirect('/clientes/');
        });
    }
});

router.post("/telefonos/deleteTelefono/:IDCliente-:Telefono", (req, res) => {
    if (!!req.params.IDCliente && !!req.params.Telefono) {
        telefonosClientesController.deleteTelefono(req.params, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete telefono'
                });
            else
                res.redirect('/clientes/');
        });

    }

});
router.get("/clientes/:ID");

module.exports = router;