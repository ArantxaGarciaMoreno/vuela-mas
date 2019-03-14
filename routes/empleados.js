const express = require("express");
const router = express.Router();
const empleadoController = require("../controllers/empleadoController");
const telefonosEmpleadosController = require("../controllers/telefonosEmpleadosController");

router.get("/", (req, res) => {
    empleadoController.getEmpleados((empleados, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show empleados'
            });
        else
            res.render("empleados", { empleados });
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        empleadoController.deleteEmpleado(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete empleado'
                });
            else
                res.redirect('/empleados/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        empleadoController.getEmpleadoUpdate(req.params.ID, (empleadoUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show empleado to update'
                });
            } else {
                empleadoController.getEmpleados((empleados, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show empleados'
                        });
                    } else {
                        res.render("empleados", { empleados, empleadoUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        empleadoController.updateEmpleado(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update empleado"
                });
            else
                res.redirect("/empleados/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        empleadoController.createEmpleado(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create empleado'
                });
            else
                res.redirect('/empleados/');
        });
    }
});

router.get("/telefonos/:IDEmpleado", (req, res) => {
    if (!!req.params.IDEmpleado) {
        telefonosEmpleadosController.getTelefonos(req.params.IDEmpleado, (telefonos, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show telefonos'
                });
            } else {
                empleadoController.getEmpleado(req.params.IDEmpleado, (empleado, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show empleado'
                        });
                    } else {
                        res.render("empleados", { telefonos, empleado });
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
        telefonosEmpleadosController.createTelefono(req.body, (err) => {
            if (err) {
                console.log(err)
                res.json({
                    success: false,
                    msg: 'Failed to agregar telefono'
                });
            }
            else
                res.redirect(`/empleados/telefonos/${req.body.IDEmpleado}`);
        });
    }
});

router.post("/telefonos/deleteTelefono/:IDEmpleado-:Telefono", (req, res) => {
    if (!!req.params.IDEmpleado && !!req.params.Telefono) {
        telefonosEmpleadosController.deleteTelefono(req.params, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete telefono'
                });
            else
                res.redirect(`/empleados/telefonos/${req.params.IDEmpleado}`);
        });

    }

});

router.get("/empleados/:ID");

module.exports = router;