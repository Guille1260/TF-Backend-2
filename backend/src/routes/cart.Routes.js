import { Router } from "express";
import {getCarts,getCartById,createCart,addCartProduct,deleteProductFromCart,clearCart,updateCart} from '../controller/cart.controller.js'


const cartRouter = Router();

// muestra carritos
cartRouter.get("/",getCarts);
// muestra carrrito por el id
cartRouter.get("/:id",getCartById)
// crea un carrito nuevo
cartRouter.post("/",createCart)
// agregar un producto al carrito
cartRouter.post("/:cid/product/:pid",addCartProduct)
// elimina un produto del carrito
cartRouter.delete("/:cid/product/:pid",deleteProductFromCart)
// elimina todos los productos del carrito
cartRouter.delete("/:cid",clearCart)
// actualiza el carrito pasando un array
cartRouter.put("/:cid", updateCart);  
// actualiza la cantidad de un producto en el carrito
export default cartRouter;