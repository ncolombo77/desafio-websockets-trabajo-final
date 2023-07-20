import { Router } from "express";
import { CartManager } from "../dao/cartManager.js";
import { ProductManager } from "../dao/productManager.js";

const cartService = new CartManager('carts.json');
const productService = new ProductManager('products.json');

const router = Router();


router.post("/", async (req, res) => {
    try {
        const cartCreated = await cartService.save();
        res.json({ status: "success", data: cartCreated, message: "Carrito creado." });
    }
    catch (error) {
        res.json({ status:"error", message: error.message });
    }
});


router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;

        const cart = await cartService.getById(cartId);

        res.json({ status: "success", data: cart });
    }
    catch (error) {
        res.json({ status:"error", message: error.message });
    }
});


router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cart = await cartService.getById(cartId);
        if (cart) {
            const product = await productService.getById(productId);
            let cartProducts = cart.products;

            let prod = cartProducts.find((p) => { return parseInt(p.product) === parseInt(productId) });

            if (prod != undefined) {
                prod.quantity++;
            }
            else {
                const newProd = {
                    product: parseInt(productId),
                    quantity: 1
                };
                cart.products.push(newProd);
            }

            cartService.update(cartId, cart);

            res.json({ status: "success", data: cart });
        }
        else {
            res.json({ status: "error", message: `El carrito ${ cid } no existe.`});
        }


    }
    catch (error) {
        res.json({ status:"error", message: error.message });
    }
});


export { router as cartsRouter };