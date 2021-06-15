const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/myshop-api";

const connect = async () => {
    try {
        await mongoose.connect(DB_URL, { useNewConnection: true, useUnifiedTopology: true });
        console.log("Conectando a la base de datos");
    } catch (eror) {
        console.log("Ha ocurrido un error conectando a la base de datos. ", error);
    }
};

module.exports = {
    DB_URL,
    connect,
};
