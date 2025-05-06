import   ProductDAO  from '../daos/product.dao.js'

const PD = new ProductDAO()

//mostrar productos
export const getProducts = async (req,res)=>{
    const products = await PD.getProducts();
    res.send({ result: products });
}
//mostrar producto por id
export const getProductsById = async (req,res)=>{
    const id = req.params.id;
    const product = await PD.getProductsById(id)
    res.send({ result: product });
}
//agregar nuevo producto
export const addProduct = async(req,res)=>{
    try {
        const { title, description, code, price, status, category, thumbnail ,stock} = req.body;
        if (!title || !description || !code || !price || !category || !status ||  !stock ) {
            return res.status(400).json({ error: "Todos los campos (excepto imagen) son obligatorios" });
        }
        const newProduct = {
            title,
            description,
            code,
            price,
            status,
            category,
            thumbnail: thumbnail ? [thumbnail] : [],
            stock: parseInt(stock, 10)
        };
        const result = await PD.addProduct(newProduct);
        if (!result) {
            return res.status(500).json({ error: "No se pudo guardar el producto" });
        }
        res.status(201).json({ message: "Producto guardado correctamente", product: result });
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
//modificar producto por id
export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const newProductData = req.body;
        const updatedProduct = await PD.updateProduct(pid, newProductData);
        if (!updatedProduct) {
            return res.status(404).json({ error: "Producto no encontrado o no actualizado" });
        }
        res.send({ message: "Producto actualizado correctamente", product: updatedProduct });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
//eliminar producto por id
export const deleteProduct = async(req,res)=>{
    try {
        const { pid } = req.params;
        const deletedProduct = await PD.deleteProduct(pid);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Producto no encontrado o no eliminado" });
        }
        res.json({ status: "OK", message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}