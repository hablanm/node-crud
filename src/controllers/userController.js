const { createUser, validateUser } = require('../models/user');
const { 
  createUserInDb, 
  getUsersFromDb, 
  getUserByIdFromDb, 
  updateUserInDb, 
  deleteUserInDb 
} = require('../services/userService');

// Fungsi untuk membuat user
const createUserController = async (req, res) => {
  const { name, email, age } = req.body;

  // Validasi data
  const validationError = validateUser({ name, email, age });

  if (validationError) {
    return res.status(400).json({ message: 'Validation failed', error: validationError.details });
  }

  const user = createUser(name, email, age);

  try {
    await createUserInDb(user);
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mendapatkan semua users
const getUsersController = async (req, res) => {
  try {
    const users = await getUsersFromDb();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mendapatkan user berdasarkan ID
const getUserByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdFromDb(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mengupdate user
const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const user = { name, email, age };

  const validationError = validateUser(user);

  if (validationError) {
    return res.status(400).json({ message: 'Validation failed', error: validationError.details });
  }

  try {
    const result = await updateUserInDb(id, user);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated', user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk menghapus user
const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteUserInDb(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
