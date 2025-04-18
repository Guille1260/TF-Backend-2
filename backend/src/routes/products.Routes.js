import { Router } from "express";
import {getProducts} from '../controller/products.controller.js'


const productsRouter = Router();

productsRouter.get("/",getProducts)

export default productsRouter;