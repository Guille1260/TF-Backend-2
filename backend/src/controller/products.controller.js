import   ProductDAO  from '../daos/product.dao.js'

const PD = new ProductDAO()

export const getProducts = async (req,res)=>{
    const products = await PD.getProducts();
    res.send({ result: products });
}