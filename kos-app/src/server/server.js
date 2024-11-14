// server.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Koneksi ke database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Rute pengguna
app.use('/api/users', userRoutes);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});