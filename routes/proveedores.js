const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedorController");

router.get("/", (req, res) => {
    proveedorController.getProveedores((proveedores, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show proveedores'
            });
        else
            res.render("proveedores", { proveedores });
    });
});

router.post("/delete/:ID", (req, res) => {
    if (!!req.params.ID) {
        proveedorController.deleteProveedor(req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete proveedor'
                });
            else
                res.redirect('/proveedores/');
        });

    }

});

router.get("/show/:ID", (req, res) => {
    if (!!req.params.ID) {
        proveedorController.getProveedorUpdate(req.params.ID, (proveedorUpdate, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show proveedor to update'
                });
            } else {
                proveedorController.getProveedores((proveedores, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show proveedores'
                        });
                    } else {
                        res.render("proveedores", { proveedores, proveedorUpdate });
                    }
                });
            }
        });
    }
});

router.post("/show/update/:ID", (req, res) => {
    if (!!req.body) {
        proveedorController.updateProveedor(req.body, req.params.ID, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: "Failed to update proveedor"
                });
            else
                res.redirect("/proveedores/");
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        proveedorController.createProveedor(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to create proveedor'
                });
            else
                res.redirect('/proveedores/');
        });
    }
});

router.get("/proveedores/:ID");

module.exports = router;