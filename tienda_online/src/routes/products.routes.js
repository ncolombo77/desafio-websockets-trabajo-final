import { Router } from "express";
import { ProductManager } from "../dao/productManager.js";

const productService = new ProductManager('products.json');


const validateFields = (req, res, next) => {
    const productInfo = req.body;

    if (!productInfo.title || !productInfo.description || !productInfo.price ||
        !productInfo.code || !productInfo.status || !productInfo.stock || !productInfo.category) {
            return res.json({status: "error", message: "Falta información del producto."});
        }
    else {
        next();
    }
}


const router = Router();


router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;

        const products = await productService.get();

        if (limit) {
            res.send(products.slice(0, limit));
        }
        else {
            res.json({ status: "success", data: products });
        }

    }
    catch (error) {
        res.json({ status:"error", message: error.message });
    }
});


router.get("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid;

        const product = await productService.getById(productId);

        res.json({ status: "success", data: product });
    }
    catch (error) {
        res.json({ status:"error", message: error.message });
    }
});


router.post("/", validateFields, async (req, res) => {
    try {
        const productInfo = req.body;
        const productCreated = await productService.save(productInfo);
        res.json({ status: "success", data: productCreated, message: "Producto creado." });
    }
    catch (error) {
        res.json({ status: "error", message: error.message });
    }
});


router.put("/:pid", validateFields, async (req, res) => {
    try {
        const productInfo = req.body;

        const productUpdated = await productService.update(productInfo);

        res.json({ status: "success", data: productUpdated, message: "Producto actualizado." });
    }
    catch (error) {
        res.json({ status: "error", message: error.message });
    }
});


router.delete("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid;

        const productDeleted = await productService.delete(productId);

        res.json({ status: "success", data: productDeleted });
    }
    catch (error) {
        res.json({ status: "error", message: error.message });
    }
});


export { router as productsRouter };