import {productModel} from '../models/product.model.js'

class ProductDAO {
    getProducts = async(limit,page,sort,query)=>{
        try {
            let products = await productModel.find().lean()
            return products
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    getProductsById = async (id) => {
        try {
            const product = await productModel.findById(id).lean();
            return product || { error: "ID de Producto no encontrado" };
        } catch (error) {
            return { error: "ID inválido o error en la búsqueda" };
        }
    }
    addProduct = async(product) => {
        try {
            const newProduct = new productModel(product);
            return await newProduct.save(); 
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            return null; 
        }
    }
    updateProduct = async (id, newProductData) => {
        const updatedProduct = await productModel.findByIdAndUpdate(id, newProductData, { new: true });
        return updatedProduct; // Si no existe, será null
    };
    
    deleteProduct = async (pid) =>{
        try {
            const deletedProduct = await productModel.findByIdAndDelete(pid);
            return deletedProduct; 
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            return null; 
        }
    }
}

export default ProductDAO;