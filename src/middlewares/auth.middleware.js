export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'No autenticado' });

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'No autorizado' });
  }

  next();
};