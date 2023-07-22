import { Router } from "express";
import { ProductManager } from "../dao/productManager.js";

const productService = new ProductManager('products.json');

const router = Router();

router.get("/", async (req, res) => {

    try {
        const products = await productService.get();

        res.render("home", { products});
    }
    catch (error) {
        res.render("error", error);
    }

});


router.get("/realtimeproducts", async (req, res) => {

    try {
        const products = await productService.get();

        res.render("realTimeProducts", { products });
    }
    catch (error) {
        res.render("error", error);
    }

});


export { router as viewsRouter };