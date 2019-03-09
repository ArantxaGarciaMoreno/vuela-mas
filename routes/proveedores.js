const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedorController");
const ofertaProveedorController = require("../controllers/ofertaProveedorController");
const modeloAvionController = require("../controllers/modeloAvionController");

router.get("/", (req, res) => {
    proveedorController.getProveedores((proveedores, err) => {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to show proveedores'
            });
        else {
            modeloAvionController.getModelosAvion((modelosAvion, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to show modelo de avion'
                    });
                } else {
                    res.render("proveedores", { proveedores, modelosAvion });
                }

            }
            )
        };
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

router.post("/detalles/deleteOfertaProveedor/:IDProveedor-:IDModeloAvion", (req, res) => {
    if (!!req.params.IDProveedor && !!req.params.IDModeloAvion) {
        ofertaProveedorController.deleteOfertaProveedor(req.params, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete oferta proveedor'
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

router.get("/detalles/:ID", (req, res) => {
    if (!!req.params.ID) {
        ofertaProveedorController.getModelosAvion(req.params.ID, (modelosProveedor, err) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to show modelos'
                });
            } else {
                proveedorController.getProveedorDetalle(req.params.ID, (proveedorDetalle, err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: 'Failed to show proveedor'
                        });
                    } else {
                        modeloAvionController.getModelosAvion((modelosAvion, err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: 'Failed to show modelo de avion'
                                });
                            } else {
                                res.render("proveedores", { proveedorDetalle, modelosAvion, modelosProveedor });
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

router.post("/agregarModelo", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        ofertaProveedorController.createOfertaProveedor(req.body, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to agregar modelo'
                });
            else
                res.redirect('/proveedores/');
        });
    }
});

router.get("/proveedores/:ID");

module.exports = router;