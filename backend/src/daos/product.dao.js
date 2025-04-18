import {productModel} from '../models/product.model.js'

class ProductDAO {
    getProducts = async()=>{
        try {
            let products = "todos los productos y mas"
            return products
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default ProductDAO;