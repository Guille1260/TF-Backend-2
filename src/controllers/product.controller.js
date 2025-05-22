export default class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getAll = async (req, res) => {
    const products = await this.productService.getAllProducts(req.query);
    res.json(products);
  };

  getById = async (req, res) => {
    const product = await this.productService.getProductById(req.params.id);
    res.json(product);
  };

  create = async (req, res) => {
    const product = await this.productService.createProduct(req.body);
    res.status(201).json(product);
  };

  update = async (req, res) => {
    const updated = await this.productService.updateProduct(req.params.id, req.body);
    res.json(updated);
  };

  delete = async (req, res) => {
    await this.productService.deleteProduct(req.params.id);
    res.status(204).send();
  };
}
