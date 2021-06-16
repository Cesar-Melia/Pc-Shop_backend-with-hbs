const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const isValidEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
};

const isValidPassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return re.test(String(password));
};

const registerStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },

    async (req, email, password, done) => {
        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                const error = new Error("El usuario ya existe");
                return done(error, null);
            }

            if (!isValidEmail(email)) {
                const error = new Error("Email no válido");
                return done(error, null);
            }

            if (!isValidPassword(password)) {
                const error = new Error("Contraseña no válida");
                return done(error, null);
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                name: req.body.name,
                lastName: req.body.lastName,
                email: email,
                password: passwordHash,
                adress: req.body.adress,
                country: req.body.country,
                city: req.body.city,
                orders: [],
            });

            const savedUser = await newUser.save();
            savedUser.password = null;

            return done(null, savedUser);
        } catch (error) {
            return done(error, null);
        }
    }
);

passport.use("register", registerStrategy);
