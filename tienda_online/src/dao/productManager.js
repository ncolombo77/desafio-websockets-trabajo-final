import { __dirname } from "../utils.js";
import path from "path";
import fs from "fs";

class ProductManager {
    constructor(nombreArchivo) {
        this.path = path.join(__dirname, `/files/${ nombreArchivo }`);
    };


    fileExists() {
        return fs.existsSync(this.path);
    }


    async get() {
        try {
            if (this.fileExists) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                return products;
            }
            else {
                throw new Error("Error al obtener los productos, no se encontró el archivo.");
            }
        }
        catch (error) {
            throw error;
        }
    }


    async getById(id) {
        try {
            if (this.fileExists) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);

                let product = products.find((c) => { return parseInt(c.id) === parseInt(id) });

                if (product != undefined) {
                    return product;
                }
                else {
                    throw new Error(`No existe el producto ${ id }.`);
                }
            }
            else {
                throw new Error("Error al obtener los productos, no se encontró el archivo.");
            }
        }
        catch (error) {
            throw new Error(`Error al obtener el producto ${ id }: ${ error.message }`);
        }
    }


    async save(product) {
        try {
            if (this.fileExists) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                let newId  = 1;
                if (products.length > 0) {
                    newId = parseInt(products[products.length - 1].id) + 1;
                }
                const newProduct = {
                    id: newId,
                    ...product
                };
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return newProduct;
            }
            else {
                throw new Error("Error al grabar el producto, no se encontró el archivo.");
            }
        }
        catch (error) {
            throw error;
        }
    }


    async update(producto) {
        try {
            let productos = await this.get();

            let indiceProd = productos.findIndex(prod => parseInt(prod.id) === parseInt(producto.id));

            if (indiceProd > -1) {
                productos[indiceProd].title = producto.title;
                productos[indiceProd].description = producto.description;
                productos[indiceProd].price = producto.price;
                productos[indiceProd].thumbnails = producto.thumbnails;
                productos[indiceProd].code = producto.code;
                productos[indiceProd].stock = producto.stock;
                productos[indiceProd].status = producto.status;

                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

                return productos[indiceProd];
            }
            else {
                throw new Error(`No se puede actualizar el producto, no existe el id ${ id }`);
            }

        }
        catch (error) {
            throw error;
        }
    }


    async delete(id) {
        try {
            let productos = await this.get();

            let indiceProd = productos.findIndex(prod => parseInt(prod.id) === parseInt(id));

            if (indiceProd > -1) {
                let deletedProduct = productos[indiceProd];

                productos.splice(indiceProd, 1);

                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

                return deletedProduct;
            }
            else {
                throw new Error(`No se puede eliminar el producto ${ id }, no existe el id.`);
            }
        }
        catch (error) {
            throw error;
        }
    }

}

export { ProductManager };
