import { Router } from 'express';
import passport from 'passport';
import Product from '../models/Product.js';
import { authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin'),
  async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  });

export default router;
