const socketClient = io();

const productsDIV = document.getElementById("productsList");

let HTMLProducts = "";

socketClient.on("productsUpdate", (serverData) => {
    serverData.forEach(prod => {
        HTMLProducts = HTML + `Id: ${prod.id} - Nombre: ${prod.title} (${prod.code})<br />
        Descripción: ${prod.description}<br />
        Precio: ${prod.price}<br />
        Stock: ${prod.stock}<br />
        Categoría: ${prod.category}<br />`;
    });
    productsDIV.innerHTML = HTMLProducts;
});