// controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.registerUser  = (req, res) => {
  const { nama, username, password, tempat_lahir, tanggal_lahir, gender, alamat, telepon, email } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    // SQL untuk menyimpan data pengguna
    const sql = 'INSERT INTO users (nama, username, password, tempat_lahir, tanggal_lahir, gender, alamat, telepon, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nama, username, hashedPassword, tempat_lahir, tanggal_lahir, gender, alamat, telepon, email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error registering user' });
      }
      res.status(201).json({ message: 'User  registered successfully' });
    });
  });
};