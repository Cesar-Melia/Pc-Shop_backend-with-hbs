const API_URL = "http://localhost:3000";

const form$$ = document.body.querySelector('[data-function="form"]');
const id$$ = document.body.querySelector('[data-function="id"]');

let product;

const name$$ = document.body.querySelector('[data-function="name"]');
const price$$ = document.body.querySelector('[data-function="price"]');
const description$$ = document.body.querySelector('[data-function="description"]');
const type$$ = document.body.querySelector('[data-function="type"]');
const processor$$ = document.body.querySelector('[data-function="processor"]');
const memory$$ = document.body.querySelector('[data-function="memory"]');
const gpu$$ = document.body.querySelector('[data-function="gpu"]');
const ssd$$ = document.body.querySelector('[data-function="ssd"]');
const hdd$$ = document.body.querySelector('[data-function="hdd"]');
const stars$$ = document.body.querySelector('[data-function="stars"]');
const stock$$ = document.body.querySelector('[data-function="stock"]');

id$$.addEventListener("input", async (event) => {
    event.preventDefault();

    const productId = event.target.value;

    await getProduct(productId);

    console.log(product);

    name$$.value = product.name;
    price$$.value = product.price;
    description$$.value = product.description;
    type$$.value = product.type;
    processor$$.value = product.processor;
    memory$$.value = product.memory;
    gpu$$.value = product.gpu;
    ssd$$.value = product.ssd;
    hdd$$.value = product.hdd;
    stars$$.value = product.stars;
    stock$$.value = product.stock;
});

form$$.addEventListener("submit", async (event) => {
    event.preventDefault();
});

const editProduct = async (productId) => {
    try {
        // const res = await fetch(`${API_URL}/products/edit`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        //     body = JSON.stringify({
        //         _id: product._id,
        //         name: product.name,
        //         price: product.price,
        //         description: product.description,
        //         type: product.type,
        //         processor: product.processor,
        //         memory: product.memory,
        //         gpu: product.gpu,
        //         ssd: product.ssd,
        //         hdd: product.hdd,
        //         stars: product.stars,
        //         stock: product.stock,
        //     })
        // });
    } catch (error) {
        return console.log("No se ha podido actualizar el producto: ", error);
    }
};

const getProduct = async (productId) => {
    console.log("Entra en getProtuct", productId);

    try {
        const res = await fetch(`${API_URL}/products/${productId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });

        product = await res.json();

        return console.log("Producto cargado");
    } catch (error) {
        return console.log("No encuentra el id del producto: ", error);
    }
};
