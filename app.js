require("dotenv").config({ path: "variables.env" });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const aeropuertoRoute = require("./routes/aeropuertos");
const clienteRoute = require("./routes/clientes");
const empleadoRoute = require("./routes/empleados")
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