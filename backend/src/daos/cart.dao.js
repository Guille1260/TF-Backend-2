import {cartModel} from '../models/cart.model.js'

class CartDAO {
    getCarts= async()=> {
        return await cartModel.find().populate('products.product').lean(); // Se agrega populate
    }
    getCartById = async(id)=> {
        try {
            const cart = await cartModel.findOne({ _id: id }).populate("products.product").lean(); 
            if (!cart) {
                return ("Carrito no encontrado");
            }
            return cart;
        } catch (error) {
            return null;
        }
    }
    createCart = async()=> {
        const cart = await cartModel.create({ products: [] });
        return cart;
    }
    addCartProduct = async (cid, pid) => {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) return null;
    
            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
            
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
    
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error al agregar producto al carrito: " + error.message);
        }
    };
    deleteProductFromCart = async (cid, pid) => {
        try {
            const cart =  await cartModel.findById(cid);
            if (!cart) {
                return { error: true, message: "Carrito no encontrado" };
            }
            const originalLength = cart.products.length;
            const updatedProducts = cart.products.filter(
                item => item.product._id.toString() !== pid
            );
            if (updatedProducts.length === originalLength) {
                return { error: true, message: "El producto no se encontró en el carrito" };
            }
            await cartModel.updateOne({ _id: cid }, { products: updatedProducts });
            return { message: "El producto se eliminó del carrito correctamente" };
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            throw new Error("Error interno al eliminar el producto del carrito");
        }
    };
    clearCart = async(cid)=>{
        try {
            let cart = await cartModel.findById(cid);
            if (!cart) {
                return {mensaje:"Carrito no encontrado:"};
            }
            cart.products = []; 
            await cart.save();
            return ({ mensaje: "Se eliminaron todos los productos del carrito", cart });
        } catch (error) {
            console.error("Error al eliminar todos los productos del carrito:", error);
        }
    }
    updateCart = async (cartId, updatedCartData) => {
        try {
            const updatedCart = await cartModel.findByIdAndUpdate(cartId, { products: updatedCartData.products }, { new: true });
            if (!updatedCart) {
                return { error: true, message: "Carrito no encontrado" };
            }
            return { message: "Carrito actualizado correctamente", updatedCart };
        } catch (error) {
            console.error("Error al actualizar carrito:", error);
            throw new Error("Error interno al actualizar el carrito");
        }
    };
    
}

export default CartDAO;