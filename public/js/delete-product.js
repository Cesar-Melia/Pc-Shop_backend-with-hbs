const API_URL = "http://localhost:3000";

const form$$ = document.body.querySelector('[data-function="form"]');

form$$.addEventListener("submit", (event) => {
    event.preventDefault();
    const input$$ = document.body.querySelector('[data-function="input"]').value;
    const productId = input$$;

    deleteProduct(productId);
});

const deleteProduct = async (productId) => {
    try {
        const res = await fetch(`${API_URL}/products/delete/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        });

        return console.log("Producto borrado");
    } catch (error) {
        return console.log("No encuentra el id del producto: ", error);
    }
};
