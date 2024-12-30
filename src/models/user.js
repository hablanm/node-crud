const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// Skema validasi untuk user tanpa menyertakan id
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(120).required(),
});

// Fungsi untuk memvalidasi user
const validateUser = (user) => {
  const { error } = userSchema.validate(user);
  return error;
};

// Fungsi untuk membuat user baru
const createUser = (name, email, age) => ({
  id: uuidv4(), // Mengenerate uuid
  name,
  email,
  age,
});

module.exports = { createUser, validateUser };
