import { Router } from "express";
import {getCarts} from '../controller/cart.controller.js'


const cartRouter = Router();


cartRouter.get("/",getCarts)


export default cartRouter;