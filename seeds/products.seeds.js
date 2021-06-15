const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const db = require("../db");

const productsSeed = [
    {
        name: "Zapatos Vintage",
        price: 49.99,
        description: "Bellos zapatos antiguos para Hipsters.",
        stars: 4.5,
        image: "https://i.ibb.co/4j85tBM/shoes.jpg",
    },
    {
        name: "Lapiceros de colores",
        price: 1.99,
        description: "Estupendos bolígrafos de colores.",
        stars: 1,
        image: "https://i.ibb.co/s5m7HKt/lapiceros.jpg",
    },
    {
        name: "Pantalón",
        price: 49.99,
        description: "Pantalón de moto para evitar heridas.",
        stars: 4,
        image: "https://i.ibb.co/6nnVkNY/pantalon.jpg",
    },
    {
        name: "Cuaderno de colores",
        price: 7.25,
        description: "Excelente cuaderno para que apuntes tus clases.",
        stars: 3.5,
        image: "https://i.ibb.co/Jr3FHVd/cuaderno.jpg",
    },
    {
        name: "Jarabe marca blanca",
        price: 12.5,
        description: "No cura el COVID, pero está muy rico.",
        stars: 1,
        image: "https://i.ibb.co/mhgHWnf/jarabe.jpg",
    },
    {
        name: "Maceta de diseño",
        price: 9.99,
        description: "Maceta de diseño a precio económico.",
        stars: 5,
        image: "https://i.ibb.co/MZSrV6q/maceta.jpg",
    },
    {
        name: "Gato Persa",
        price: 100,
        description: "No sé si es legal vender animales online...",
        stars: 3,
        image: "https://i.ibb.co/1zPPBjx/gato.jpg",
    },
];
console.log(db.DB_URL);
mongoose
    .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Conectando a la base de datos desde el seed...");

        const allProducts = await Product.find();

        if (allProducts.length) {
            await Product.collection.drop();
            console.log("Colección eliminada correctamente...");
        }
    })
    .then(async () => {
        await Product.insertMany(productsSeed);
        console.log("SUCCESS: Productos añadidos con éxito...");
    })
    .catch((error) => {
        console.log("Error añadiendo el seed", error);
    })
    .finally(() => mongoose.disconnect());
