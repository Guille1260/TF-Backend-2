import { Router } from "express";
import {addProduct, deleteProduct, getProducts,getProductsById, updateProduct} from '../controller/products.controller.js'


const productsRouter = Router();

//muestra de productos
productsRouter.get("/",getProducts);
//producto por id
productsRouter.get("/:id",getProductsById)
// Agregar un nuevo producto
productsRouter.post("/",addProduct);
//actualizar un producto por id
productsRouter.put("/:pid",updateProduct);

//eliminar un producto por id
productsRouter.delete("/:id",deleteProduct);




export default productsRouter;