const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const db = require("../db");

const productsSeed = [
    {
        name: "Pc Silver AMD Ryzen 5",
        price: 1449.99,
        description:
            "Entra en la nueva generación de procesadores AMD Ryzen 5 con el nuevo PC Silver. Su procesador AMD Ryzen 5 3600 de seis núcleos, 16 GB de RAM DDR4 y su potente tarjeta gráfica RTX3060 te ofrecerán toda la potencia necesaria para disfrutar de los últimos juegos del mercado.",
        type: "pc-tower",
        processor: "AMD Ryzen 5 3600 3.6 Ghz",
        memory: "16 GB",
        gpu: "Nvidia GeForce Gaming RTX 3060 12GB GDDR6",
        ssd: "480 GB",
        hdd: "1 TB",
        stars: 4.5,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182094/w4qoy3mnznsgbtqbqlst.jpg",
        stock: 78,
    },
    {
        name: "Pc Silver Ultra Intel Core I5",
        price: 1189.99,
        description:
            "El nuevo Pc Silver está equipado con un procesador de nueva generación Intel Core i5 10400F, gráficos impresionantes gracias a su Nvidia GTX 1660 Super de 6GB GDDR5 y 16GB de RAM DDR4 que te ofrecerá toda la potencia necesaria para disfrutar de los últimos juegos Online de más éxito del momento como Fortnite,COD, PUBG, APEX, CSGO...con una relación calidad/precio inigualable.",
        type: "pc-tower",
        processor: "Intel Core i5-10400F 2.90 GHz",
        memory: "16 GB",
        gpu: "Nvidia GeForce GTX 1660 Super 6GB GDDR5",
        ssd: "480 GB",
        hdd: "1 TB",
        stars: 3.5,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182226/jtpmpcj5xmnak2rmed0k.jpg",
        stock: 53,
    },
    {
        name: "Pc Gold Intel Core i5",
        price: 1927.5,
        description:
            "Prepárate para el futuro con nuestro Pc Gold , gracias a la nueva gráfica Nvidia RTX 3070 de 8GB y el nuevo procesador i5-10600K Comet Lake de 6 núcleos estarás preparado para el gaming más puro, !No es el futuro, es el presente!. Una máquina indomable que te brindará una sensación de potencia descomunal a la hora de jugar. Creada y ensamblada con la mayor precisión y los mejores componentes del momento, el PcCom Gold posee unas condiciones inigualables para el juego, superando ampliamente los requisitos técnicos requeridos por los juegos que actualmente van apareciendo en el mercado.",
        type: "pc-tower",
        processor: "Intel Core i5-10600K 4.10GHz",
        memory: "32 GB",
        gpu: "Nvidia GeForce RTX 3070 8GB GDDR6",
        ssd: "480 GB M2 NVMe",
        hdd: "1 TB",
        stars: 4.9,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182285/hm5gbpmxoslzypcgqqj4.jpg",
        stock: 8,
    },
    {
        name: "Pc Gold AMD Ryzen 5",
        price: 2135.76,
        description:
            "Prepárate para el futuro con nuestro Pc Gold , gracias a la nueva gráfica Nvidia RTX 3070 8GB GDDR6 y el nuevo procesador AMD Ryzen 5 3600 estarás preparado para el gaming más puro, !No es el futuro, es el presente!. Una máquina indomable que te brindará una sensación de potencia descomunal a la hora de jugar. Creada y ensamblada con la mayor precisión y los mejores componentes del momento, el PcCom Gold posee unas condiciones inigualables para el juego, superando ampliamente los requisitos técnicos requeridos por los juegos que actualmente van apareciendo en el mercado.",
        type: "pc-tower",
        processor: "AMD Ryzen 5 3600 3.6GHz",
        memory: "32 GB",
        gpu: "Nvidia GeForce RTX 3070 8GB GDDR6",
        ssd: "1 TB M2 NVMe",
        stars: 5,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182327/tz87tacabdbqvkhly2ac.jpg",
        stock: 67,
    },
    {
        name: "Pc Silver Ryzen 7",
        price: 1337.28,
        description:
            "Entra en la 3ª generación de procesadores AMD Ryzen 7 con el nuevo PC SILVER . Su procesador AMD Ryzen 7 3700X el cual consta de 8 núcleos multihilo con una velocidad de 4400 MHz cada uno de ellos, dando como resultado 16 líneas de procesamiento, 16 GB de RAM DDR4 a 3200Mhz y su potente tarjeta gráfica Nvidia GTX 1660 Super te ofrecerán toda la potencia necesaria para disfrutar de los últimos juegos del mercado.",
        type: "pc-tower",
        processor: "AMD Ryzen 7 3700X",
        memory: "16 GB",
        gpu: "Nvidia GeForce GTX 1660 Super 6GB GDDR6",
        ssd: "480 GB",
        hdd: "1 TB",
        stars: 3.2,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182376/fvdvph3mdr8d9p67eehx.jpg",
        stock: 5,
    },
    {
        name: 'Asus Rog Strix G513IH"',
        price: 889.28,
        description:
            "Eleva tu experiencia gaming con la potencia de fuego del ROG Strix . Con la potente CPU AMD Ryzen™ 7 4800H y la GPU GeForce GTX 1650 todo va más rápido, desde los juegos a la multitarea avanzada. Compite a toda velocidad en títulos de eSports .",
        type: "laptop",
        processor: "AMD Ryzen 7 4800H 2.9GHz",
        memory: "8 GB",
        gpu: "NVIDIA GeForce GTX 1650 (4GB GDDR6)",
        ssd: "512 GB M2 NVMe",
        stars: 1.5,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182413/ygh6louwohpj5mvxb6pu.jpg",
        stock: 34,
    },
    {
        name: 'MSI GP66 Leopard"',
        price: 1478.98,
        description:
            "Prepárate para sentir todo el poder del juego con el potente ordenador portátil de MSI GP66 Leopard. Directamente de la línea de sangre de la legendaria serie GP, llega una bestia rugiente con un diseño deportivo y un potente rendimiento. Con la nueva serie GP, eres el dueño del mundo gaming.",
        type: "laptop",
        processor: "Intel® Core™ i7-10750H Comet Lake",
        memory: "8 GB",
        gpu: "NVIDIA GeForce GTX 1650 (4GB GDDR6)",
        ssd: "1TB M2 NVMe",
        stars: 4.2,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182442/ftv5wwjr6nybaflem53y.jpg",
        stock: 101,
    },
    {
        name: 'MSI GE66 Raider"',
        price: 1699.89,
        description:
            "Prepárate para sentir todo el poder del juego con el potente ordenador portátil de MSI GP66 Leopard. Directamente de la línea de sangre de la legendaria serie GP, llega una bestia rugiente con un diseño deportivo y un potente rendimiento. Con la nueva serie GP, eres el dueño del mundo gaming.",
        type: "laptop",
        processor: "Intel® Core™ Comet lake i7-10870H+HM470",
        memory: "32 GB",
        gpu: "NVIDIA GeForce RTX3060, GDDR6 6GB 130W",
        ssd: "1TB M2 NVMe",
        stars: 5,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182476/wzznpqz5wmjf4lyuqoex.jpg",
        stock: 15,
    },
    {
        name: 'MSI Bravo 15"',
        price: 950.95,
        description:
            "Bravo 15 enciende el mundo de las computadoras portátiles para juegos al combinar el procesador AMD Ryzen ™ de tecnología 7nm más avanzado y los gráficos Radeon ™ RX, brindando un rendimiento sorprendente y una pantalla de juegos fluida con la tecnología FreeSync ™ Premium. El audio inmersivo de alta resolución ofrece una experiencia de audio sin pérdidas. El exclusivo sistema térmico Cooler Boost 5 garantiza la consistencia de cualquier tarea de alta potencia. Con estas funciones listas para el juego, estás preparado para conquistar todas las batallas del juego.",
        type: "laptop",
        processor: "AMD® Ryzen 7 5800H",
        memory: "16 GB",
        gpu: "RX5500M, GDDR6 4GB",
        ssd: "512 GB M2 NVMe",
        stars: 3.7,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182527/m5fchuroufforfvypk6e.jpg",
        stock: 2,
    },
    {
        name: "HP Pavilion 15",
        price: 999.99,
        description:
            "Trabaja desde cualquier lugar. Juega desde donde quieras. El ordenador portátil Pavilion 15 te ofrece un mayor rendimiento en un menor formato, para una máxima eficacia en tus tareas desde cualquier lugar. Disfruta de tus contenidos con una impresionante calidad gracias a su pantalla con microborde y al sonido de B&O.",
        type: "laptop",
        processor: "Intel Core i5-1135G7 (8MB Cache, 2.4GHz)",
        memory: "8 GB",
        gpu: "NVIDIA GeForce MX350 2GB GDDR5",
        ssd: "512 GB M2 NVMe",
        stars: 2.5,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624182573/uszi1wmuknveyic5ytbo.jpg",
        stock: 32,
    },
    {
        name: "Lenovo IdeaPad 3 Chromebook",
        price: 201.89,
        description:
            'El Chromebook IdeaPad 3 de 27,94 cm (11"), rápido, flexible y entretenido, te ofrece todas tus funciones favoritas de un Chromebook en un chasis fino y portátil. Su sistema operativo Chrome ultrarrápido se inicia en segundos, se actualiza automáticamente y cuenta con protección antivirus integrada. Con procesadores Intel® y hasta 10 horas de duración de la batería, funcionará sin problemas durante todo el día y algo más.',
        type: "laptop",
        processor: "Intel Celeron N4020",
        memory: "4 GB",
        gpu: "Intel® HD Graphics",
        ssd: "64 GB",
        stars: 2,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624183173/tr5rozwnnbnc33cm8bn2.jpg",
        stock: 20,
    },
    {
        name: "MSI GE76 Raider",
        price: 3699.99,
        description:
            "Prepárate para sentir todo el poder del juego con el potente ordenador portátil de MSI GE76 Raider.",
        type: "laptop",
        processor: "Intel Core i9 Comet lake",
        memory: "64 GB",
        gpu: "NVIDIA GeForce RTX3080, GDDR6 16GB",
        ssd: "2 TB M2 NVMe",
        stars: 5,
        image: "https://res.cloudinary.com/diuuu0rat/image/upload/v1624183067/wzndzkevfdaizt9txbz9.jpg",
        stock: 2,
    },
];
console.log(db.DB_URL);
mongoose
    .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Conectando a la base de datos desde el seed de productos...");

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
        console.log("Error añadiendo el seed de productos", error);
    })
    .finally(() => mongoose.disconnect());
