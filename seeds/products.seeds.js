const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const db = require("../db");

const productsSeed = [
    {
        name: "Pc Silver AMD Ryzen 5 3600 16GB 480GBSSD 1TB RTX3060",
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
        image: "https://thumb.pccomponentes.com/w-530-530/articles/37/378452/1634-pccom-silver-amd-ryzen-5-3600-16gb-480gbssd-1tb-rtx3060-comprar.jpg",
    },
    {
        name: "Pc Silver Ultra Intel Core I5 10400F 16GB 480SSD 1TB GTX1660S",
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
        image: "https://thumb.pccomponentes.com/w-530-530/articles/31/316025/1773-pccom-silver-ultra-intel-core-i5-10400f-16gb-480ssd-1tb-gtx1660s-comprar.jpg",
    },
    {
        name: "Pc Gold Intel Core i5-10600K/16GB/480GB SSD+1TB/RTX3070",
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
        image: "https://thumb.pccomponentes.com/w-530-530/articles/33/333573/1722-pccom-gold-intel-core-i5-10600k-16gb-480gb-ssd-1tb-rtx3070-comprar.jpg",
    },
    {
        name: "Pc Gold AMD Ryzen 5 3600 16GB 1TBSSD RTX3070 Windows 10 Pro",
        price: 2135.76,
        description:
            "Prepárate para el futuro con nuestro Pc Gold , gracias a la nueva gráfica Nvidia RTX 3070 8GB GDDR6 y el nuevo procesador AMD Ryzen 5 3600 estarás preparado para el gaming más puro, !No es el futuro, es el presente!. Una máquina indomable que te brindará una sensación de potencia descomunal a la hora de jugar. Creada y ensamblada con la mayor precisión y los mejores componentes del momento, el PcCom Gold posee unas condiciones inigualables para el juego, superando ampliamente los requisitos técnicos requeridos por los juegos que actualmente van apareciendo en el mercado.",
        type: "pc-tower",
        processor: "AMD Ryzen 5 3600 3.6GHz",
        memory: "32 GB",
        gpu: "Nvidia GeForce RTX 3070 8GB GDDR6",
        ssd: "1 TB M2 NVMe",
        stars: 5,
        image: "https://thumb.pccomponentes.com/w-530-530/articles/35/359873/1198-pccom-gold-amd-ryzen-5-3600-16gb-1tbssd-rtx3070-windows-10-pro.jpg",
    },
    {
        name: "Pc Silver Ryzen 7 3700X 16GB 1TB 480GBSSD GTX1660S",
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
        image: "https://thumb.pccomponentes.com/w-530-530/articles/30/302696/3736-pccom-silver-ryzen-7-3700x-16gb-1tb-480gbssd-gtx1660s-especificaciones.jpg",
    },
    {
        name: 'Asus Rog Strix G513IH HN008 AMD Ryzen 7 4800H 16GB 512GB SSD GTX 1650 15.6"',
        price: 889.28,
        description:
            "Eleva tu experiencia gaming con la potencia de fuego del ROG Strix . Con la potente CPU AMD Ryzen™ 7 4800H y la GPU GeForce GTX 1650 todo va más rápido, desde los juegos a la multitarea avanzada. Compite a toda velocidad en títulos de eSports .",
        type: "laptop",
        processor: "AMD Ryzen 7 4800H 2.9GHz",
        memory: "8 GB",
        gpu: "NVIDIA GeForce GTX 1650 (4GB GDDR6)",
        ssd: "512 GB M2 NVMe",
        stars: 1.5,
        image: "https://thumb.pccomponentes.com/w-530-530/articles/36/364231/1365-asus-rog-strix-g513ih-hn008-amd-ryzen-7-4800h-16gb-512gb-ssd-gtx-1650-156.jpg",
    },
    {
        name: 'MSI GP66 Leopard 10UE-484XES Intel Core i7-10750H/16GB/1TB SSD/RTX 3060/15.6"',
        price: 1478.98,
        description:
            "Prepárate para sentir todo el poder del juego con el potente ordenador portátil de MSI GP66 Leopard. Directamente de la línea de sangre de la legendaria serie GP, llega una bestia rugiente con un diseño deportivo y un potente rendimiento. Con la nueva serie GP, eres el dueño del mundo gaming.",
        type: "laptop",
        processor: "Intel® Core™ i7-10750H Comet Lake",
        memory: "8 GB",
        gpu: "NVIDIA GeForce GTX 1650 (4GB GDDR6)",
        ssd: "1TB M2 NVMe",
        stars: 4.2,
        image: "https://thumb.pccomponentes.com/w-530-530/articles/38/389132/1324-msi-gp66-leopard-10ue-484xes-intel-core-i7-10750h-16gb-1tb-ssd-rtx-3060-156.jpg",
    },
    {
        name: 'MSI GE66 Raider 10UE-404XES Intel Core i7-10870H/32GB/1TB SSD/RTX 3060/15.6"',
        price: 1699.89,
        description:
            "Prepárate para sentir todo el poder del juego con el potente ordenador portátil de MSI GP66 Leopard. Directamente de la línea de sangre de la legendaria serie GP, llega una bestia rugiente con un diseño deportivo y un potente rendimiento. Con la nueva serie GP, eres el dueño del mundo gaming.",
        type: "laptop",
        processor: "Intel® Core™ Comet lake i7-10870H+HM470",
        memory: "32 GB",
        gpu: "NVIDIA GeForce RTX3060, GDDR6 6GB 130W",
        ssd: "1TB M2 NVMe",
        stars: 5,
        image: "https://thumb.pccomponentes.com/w-530-530/articles/38/387835/1614-msi-ge66-raider-10ue-404xes-intel-core-i7-10870h-32gb-1tb-ssd-rtx-3060-156-36bc26ca-adfb-4342-9fd7-e597a002c71f.jpg",
    },
    {
        name: 'MSI Bravo 15 B5DD-005XES AMD Ryzen 7 5800H/16GB/512GB SSD/RX5500M/15.6"',
        price: 999.99,
        description:
            "Bravo 15 enciende el mundo de las computadoras portátiles para juegos al combinar el procesador AMD Ryzen ™ de tecnología 7nm más avanzado y los gráficos Radeon ™ RX, brindando un rendimiento sorprendente y una pantalla de juegos fluida con la tecnología FreeSync ™ Premium. El audio inmersivo de alta resolución ofrece una experiencia de audio sin pérdidas. El exclusivo sistema térmico Cooler Boost 5 garantiza la consistencia de cualquier tarea de alta potencia. Con estas funciones listas para el juego, estás preparado para conquistar todas las batallas del juego.",
        type: "laptop",
        processor: "AMD® Ryzen 7 5800H",
        memory: "16 GB",
        gpu: "RX5500M, GDDR6 4GB",
        ssd: "512 GB M2 NVMe",
        stars: 3.7,
        image: "https://thumb.pccomponentes.com/w-530-530/articles/41/414780/1734-msi-bravo-15-b5dd-005xes-amd-ryzen-7-5800h-16gb-512gb-ssd-rx5500m-156.jpg",
    },
    {
        name: "HP Pavilion 15 Eg0005ns Intel Core I5 1135G7 8GB 512GB SSD MX350 156",
        price: 999.99,
        description:
            "Trabaja desde cualquier lugar. Juega desde donde quieras. El ordenador portátil Pavilion 15 te ofrece un mayor rendimiento en un menor formato, para una máxima eficacia en tus tareas desde cualquier lugar. Disfruta de tus contenidos con una impresionante calidad gracias a su pantalla con microborde y al sonido de B&O.",
        type: "laptop",
        processor: "Intel Core i5-1135G7 (8MB Cache, 2.4GHz)",
        memory: "8 GB",
        gpu: "NVIDIA GeForce MX350 2GB GDDR5",
        ssd: "512 GB M2 NVMe",
        stars: 2.5,
        image: "https://thumb.pccomponentes.com/w-530-530/articles/37/378017/1774-hp-pavilion-15-eg0005ns-intel-core-i5-1135g7-8gb-512gb-ssd-mx350-156.jpg",
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
