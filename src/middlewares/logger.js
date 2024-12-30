const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Membuat stream untuk menyimpan log ke file
const logStream = fs.createWriteStream(path.join(__dirname, '../logs/requests.log'), { flags: 'a' });

// Menggunakan morgan untuk log setiap request
const loggerMiddleware = morgan('combined', { stream: logStream });

module.exports = { loggerMiddleware };
