const express = require('express');
const { loggerMiddleware } = require('./middlewares/logger');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3001;

// Middleware untuk parsing JSON dan logging request
app.use(express.json());
app.use(loggerMiddleware);

// Menggunakan route untuk user
app.use(userRoutes);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export untuk keperluan testing
module.exports = app;