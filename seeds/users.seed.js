const mongoose = require("mongoose");
const User = require("../models/User.model");
const db = require("../db");

const usersSeed = [
    {
        name: "admin",
        lastName: "admin",
        email: "admin@admin.com",
        password: "$2b$10$msh4NfC7CLzOHjxcyxSxluXrKOn5ysb6ZFlTBzO55Nc49ta58YXby", //1234Asdf
        adress: "C/ Admin",
        country: "Spain",
        city: "Zamora",
        orders: [],
        role: "admin",
    },
    {
        name: "César",
        lastName: "Meliá Heráiz",
        email: "cesar@email.com",
        password: "$2b$10$msh4NfC7CLzOHjxcyxSxluXrKOn5ysb6ZFlTBzO55Nc49ta58YXby", //1234Asdf
        adress: "C/ Los Pepitos 32 12",
        country: "Spain",
        city: "Valencia",
        orders: [],
        role: "admin",
    },
    {
        name: "Pepe",
        lastName: "López García",
        email: "pepe@email.com",
        password: "$2b$10$msh4NfC7CLzOHjxcyxSxluXrKOn5ysb6ZFlTBzO55Nc49ta58YXby", //1234Asdf
        adress: "C/ Los rosales 22 5 esc.B",
        country: "Spain",
        city: "Madrid",
        orders: [],
        role: "user",
    },
    {
        name: "Laura",
        lastName: "Gómez Cabrera",
        email: "Laura@email.com",
        password: "$2b$10$msh4NfC7CLzOHjxcyxSxluXrKOn5ysb6ZFlTBzO55Nc49ta58YXby", //1234Asdf
        adress: "C/ Argentina 67 15",
        country: "Spain",
        city: "Bilbao",
        orders: [],
        role: "user",
    },
    {
        name: "Marina",
        lastName: "Gil Herrera",
        email: "marina@email.com",
        password: "$2b$10$msh4NfC7CLzOHjxcyxSxluXrKOn5ysb6ZFlTBzO55Nc49ta58YXby", //1234Asdf
        adress: "C/ Andalucia 45 32",
        country: "Spain",
        city: "Sevilla",
        orders: [],
        role: "user",
    },
];

console.log(db.DB_URL);
mongoose
    .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Conectando a la base de datos desde el seed de usuarios...");

        const allUsers = await User.find();

        if (allUsers.length) {
            await User.collection.drop();
            console.log("Colección eliminada correctamente...");
        }
    })
    .then(async () => {
        await User.insertMany(usersSeed);
        console.log("SUCCESS: Ususarios añadidos con éxito...");
    })
    .catch((error) => {
        console.log("Error añadiendo el seed de usuarios", error);
    })
    .finally(() => mongoose.disconnect());
