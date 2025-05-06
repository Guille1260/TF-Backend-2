import CartDAO from "../daos/cart.dao.js"

const CD = new CartDAO();


export const getCarts = async (req,res)=>{
    try {
        const carts = await CD.getCarts();
        res.send(carts);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los carritos", mensaje: error.message });
    }
}
export const getCartById = async (req,res)=>{
    try {
        const id = req.params.id;
        const cart = await CD.getCartById(id);
        res.send({ result: cart });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito", mensaje: error.message });
    }
}
export const createCart = async(req,res)=>{
    try {
        const cart = await CD.createCart();
        res.send({ estados:"carrito creado con exito",result: cart });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito", mensaje: error.message });
    }
}
export const addCartProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await CD.addCartProduct(cid, pid);

        if (!cart) {
            return res.send({ error: "Carrito no encontrado" });
        }

        res.send({
            mensaje: "Producto agregado al carrito",
            carrito: cart
        });

    } catch (error) {
        res.send({
            error: "Error al añadir el producto al carrito",
            mensaje: error.message
        });
    }
};
export const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await CD.deleteProductFromCart(cid, pid);
        if (result.error) {
            return res.send({ mensaje: result.message });
        }
        res.send({ mensaje: result.message });
    } catch (error) {
        res.send({ 
            error: "Error al eliminar el producto del carrito", 
            mensaje: error.message 
        });
    }
};
export const clearCart = async(req,res)=>{
    try {
        const { cid } = req.params;
        const result = await CD.clearCart(cid);
        res.send({result:result});
    } catch (error) {
        res.status(500).json({ error: "Error al vaciar el carrito", mensaje: error.message });
    }
}
export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const products = req.body;
        if (!Array.isArray(products)) {
            return res.status(400).json({ error: "El body debe ser un array de productos" });
        }
        const cart = await CD.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        const result = await CD.updateCart(cid, { products });
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

