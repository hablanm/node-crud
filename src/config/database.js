const mysql = require('mysql2/promise');

// Membuat koneksi ke database MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_db',
});

module.exports = { pool };
