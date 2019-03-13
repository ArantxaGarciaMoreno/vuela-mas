require("dotenv").config({ path: "variables.env" });

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const aeropuertoRoute = require("./routes/aeropuertos");
const clienteRoute = require("./routes/clientes");
const empleadoRoute = require("./routes/empleados");
const modeloAvionRoute = require("./routes/modelosAvion");
const proveedorRoute = require("./routes/proveedores");
const tarifaRoute = require("./routes/tarifas");
const avionRoute = require("./routes/aviones");
const mantenimientoRoute = require("./routes/mantenimientos");
const rutasRoute = require("./routes/rutas");
const vuelosRoute = require("./routes/vuelos");
const alquileresRoutes = require("./routes/alquileres");
const tripulacionesRoutes = require("./routes/tripulaciones");
const diasRutaRoutes = require("./routes/diasRuta");
const sequelize = require("./config/db");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use("/aeropuertos", aeropuertoRoute);
app.use("/clientes", clienteRoute);
app.use("/empleados", empleadoRoute);
app.use("/modelosAvion", modeloAvionRoute);
app.use("/proveedores", proveedorRoute);
app.use("/tarifas", tarifaRoute);
app.use("/aviones", avionRoute);
app.use("/rutas", rutasRoute);
app.use("/vuelos", vuelosRoute);
app.use("/alquileres", alquileresRoutes);
app.use("/mantenimientos", mantenimientoRoute);
app.use("/tripulaciones", tripulacionesRoutes);
app.use("/diasRuta", diasRutaRoutes)

sequelize
  .authenticate()
  .then(value => value)
  .catch(err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  });

sequelize.sync({ logging: false });


app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port} 🔥`);
});