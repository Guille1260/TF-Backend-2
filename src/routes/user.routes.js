import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import UserService from '../services/user.service.js';
import UserRepository from '../repositories/user.repository.js';
import UserDAO from '../dao/UserDao.js';
import passport from 'passport';

const router = Router();
const controller = new UserController(new UserService(new UserRepository(new UserDAO())));

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/current', passport.authenticate('jwt', { session: false }), controller.current);

export default router;
