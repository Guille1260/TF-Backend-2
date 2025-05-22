import { Router } from 'express';
import passport from 'passport';
import Cart from '../models/Cart.js';

const router = Router();

router.get('/:cid',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'No encontrado' });

    if (req.user.role !== 'admin' && cart._id.toString() !== req.user.cart?.toString()) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    res.json(cart);
  });

router.post('/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.params.cid !== req.user.cart?.toString()) return res.status(403).json({ error: 'No autorizado' });

    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'No encontrado' });

    const idx = cart.products.findIndex(p => p.product.toString() === req.params.pid);
    if (idx >= 0) cart.products[idx].quantity += 1;
    else cart.products.push({ product: req.params.pid, quantity: 1 });

    await cart.save();
    res.json(cart);
  });

export default router;
