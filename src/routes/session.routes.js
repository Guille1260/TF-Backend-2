import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import UserDTO from '../dtos/UserDTO.js';

const router = Router();

// Helper para generar token JWT y enviarlo en cookie
const generateToken = (user) => {
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  return token;
};

// Registro de usuario
router.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
  res.status(201).json({ message: 'Usuario registrado correctamente' });
});

// Login y creación de cookie con JWT
router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = generateToken(user);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hora
    res.json({ message: 'Login exitoso', user: UserDTO(user) });
  })(req, res, next);
});

// Logout -> limpia cookie JWT
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout exitoso' });
});

// Ruta current: devuelve datos del usuario autenticado
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userDto = UserDTO(req.user);
  res.json(userDto);
});

export default router;
