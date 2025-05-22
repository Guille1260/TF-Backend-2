export default class CartController {
  constructor(cartService, ticketService) {
    this.cartService = cartService;
    this.ticketService = ticketService;
  }

  getCart = async (req, res) => {
    const cart = await this.cartService.getCartById(req.params.cid);
    res.json(cart);
  };

  addToCart = async (req, res) => {
    const result = await this.cartService.addToCart(req.params.cid, req.body.productId, req.body.quantity);
    res.json(result);
  };

  purchase = async (req, res) => {
    const { cid } = req.params;
    const purchaser = req.user.email;

    const { success, amount, rejectedProducts } = await this.cartService.purchaseCart(cid, purchaser);

    if (success) {
      const ticket = await this.ticketService.createTicket({ amount, purchaser });
      res.json({ ticket, rejectedProducts });
    } else {
      res.status(400).json({ message: "No se pudo procesar la compra", rejectedProducts });
    }
  };
}
