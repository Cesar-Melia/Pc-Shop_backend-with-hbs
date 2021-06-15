const express = require("express");
const path = require("path"); //////////////////////
const indexRoutes = require("./routes/index.routes");
const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");
const db = require("./db");

db.connect();

const PORT = 3000;

const app = express();

app.set("views", path.join(__dirname, "views")); /////////////////
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);

app.use("*", (req, res) => {
    const error = new Error("Ruta no encontradas");
    error.status = 404;

    return res.status(404).json(error);
});

app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(error.message || "Unexpected error");
});

app.disable("x-powered-by");
app.listen(PORT, () => {
    console.log(`Server listening in port: ${PORT}`);
});
