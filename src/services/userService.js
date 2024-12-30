const { pool } = require('../config/database');

// Fungsi untuk membuat user baru
const createUserInDb = async (user) => {
  const [result] = await pool.execute(
    'INSERT INTO users (id, name, email, age) VALUES (?, ?, ?, ?)',
    [user.id, user.name, user.email, user.age]
  );
  return result;
};

// Fungsi untuk mendapatkan semua users
const getUsersFromDb = async () => {
  const [rows] = await pool.execute('SELECT * FROM users');
  return rows;
};

// Fungsi untuk mendapatkan user berdasarkan ID
const getUserByIdFromDb = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows.length ? rows[0] : null;
};

// Fungsi untuk mengupdate user
const updateUserInDb = async (id, user) => {
  const [result] = await pool.execute(
    'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
    [user.name, user.email, user.age, id]
  );
  return result;
};

// Fungsi untuk menghapus user
const deleteUserInDb = async (id) => {
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return result;
};

module.exports = {
  createUserInDb,
  getUsersFromDb,
  getUserByIdFromDb,
  updateUserInDb,
  deleteUserInDb,
};
