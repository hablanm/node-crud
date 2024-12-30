const { validateUser } = require('../models/user');

// Middleware untuk validasi user
const validateUserMiddleware = (req, res, next) => {
  const { name, email, age } = req.body;
  const validationError = validateUser({ name, email, age });

  if (validationError) {
    return res.status(400).json({ message: 'Validation failed', error: validationError.details });
  }

  next();
};

module.exports = { validateUserMiddleware };
