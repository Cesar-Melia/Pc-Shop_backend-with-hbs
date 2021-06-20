const API_URL = "http://localhost:3000";
let cart;
let product;

const addToCart = async (userId, productId) => {
    await getCart(userId);

    await getProduct(productId);

    try {
        if (!cart) {
            const res = await fetch(`${API_URL}/cart/create`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    user: userId,
                    products: [
                        {
                            product: productId,
                            quantity: 1,
                        },
                    ],
                    total: product.price,
                }),
            });

            return console.log("Cesta creada y producto añadido");
        }

        console.log("TODO");

        try {
            console.log("Cart ID: ", cart._id);

            await fetch(`${API_URL}/cart/add-product/${cart._id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    product: productId,
                    quantity: 1,
                    total: cart.total + product.price,
                }),
            });

            console.log(cart.products);

            return console.log("Producto añadido");
        } catch (error) {
            return console.log("Error añadiendo producto: ", error);
        }
    } catch (error) {
        return console.log("Error con la cesta: ", error);
    }
};

const getCart = async (userId) => {
    try {
        const res = await fetch(`${API_URL}/cart/${userId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });

        cart = await res.json();

        return console.log(cart);
    } catch (error) {
        cart = undefined;
        return console.log("No encuentra cesta: ", error);
    }
};

const getProduct = async (productId) => {
    try {
        console.log("Product Id: ", productId);

        const res = await fetch(`${API_URL}/products/${productId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        product = await res.json();

        return console.log(product);
    } catch (error) {
        return console.log("No encuentra producto: ", error);
    }
};
