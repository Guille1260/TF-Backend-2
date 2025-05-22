// src/controllers/user.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export default class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  register = async (req, res) => {
    try {
      const { first_name, last_name, email, password, role } = req.body;

      const exists = await this.userService.findByEmail(email);
      if (exists) return res.status(400).json({ message: 'El usuario ya existe' });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userService.createUser({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role: role || 'user'
      });

      res.status(201).json({ message: 'Usuario registrado correctamente', user });
    } catch (error) {
      res.status(500).json({ message: 'Error en el registro', error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findByEmail(email);

      if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

      const token = jwt.sign({ userId: user._id, email: user.email }, config.jwtSecret, {
        expiresIn: '1h'
      });

      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
      res.status(500).json({ message: 'Error en login', error: error.message });
    }
  };

  current = async (req, res) => {
    res.json({ user: req.user });
  };
}
