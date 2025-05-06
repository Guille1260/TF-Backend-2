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

// Middlewares
app.use(express.json());


//rutas
app.use("/",viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartRouter);

//conexion a mongo DB atlas
mongoose.connect("mongodb+srv://guille1260:guille01@cluster-final.07c1r58.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-final")
    .then(() => console.log("Conectado a MongoDB"))
    .catch(error => console.error("Error al conectar a MongoDB:", error));
