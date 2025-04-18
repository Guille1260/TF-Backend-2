import express from "express";
import viewsRouter from "./routes/views.Routes.js";
import productsRouter from "./routes/products.Routes.js";
import cartRouter from "./routes/cart.Routes.js";
import mongoose from 'mongoose';

const app = express();
const port = 8080;

//levanto el servidor
const server = app.listen(port,()=>{
    console.log("Servidor levantado en el puerto " +port);
})

//rutas
app.use("/",viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartRouter);

//conexion a mongo DB atlas

