const express = require("express");
const path = require("path"); //
const hbs = require("hbs"); //
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./authentication/passport");
const indexRoutes = require("./routes/index.routes");
const adminRoutes = require("./routes/admin.routes");
const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");
const cartsRoutes = require("./routes/cart.routes");
const db = require("./db");

db.connect();

const PORT = 3000;

const app = express();

app.use(
    session({
        secret: "sdfasfadsg34534534fd!",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },

        store: MongoStore.create({ mongoUrl: db.DB_URL }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views")); //
app.set("view engine", "hbs"); //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.isAdmin = false;

    if (!req.isAuthenticated()) {
        return next();
    }

    if (req.user && req.user.role === "admin") {
        req.isAdmin = true;
    }
    return next();
});

app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/cart", cartsRoutes);

app.use("*", (req, res) => {
    const error = new Error("Ruta no encontradas");
    error.status = 404;

    return res.status(404).render("error", error);
});

app.use((error, req, res, next) => {
    console.log(error);

    return res.status(error.status || 500).render("error", {
        message: error.message,
        status: error.status || 500,
        user: req.user,
        isAdmin: req.isAdmin,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening in port: ${PORT}`);
});
