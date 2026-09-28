// Route untuk registrasi dan login pengguna
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST registrasi
router.post('/register', (req, res) => {
  const { nama, email, password } = req.body;
  const sql = 'INSERT INTO users (nama, email, password) VALUES (?, ?, ?)';
  db.query(sql, [nama, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Registrasi berhasil' });
  });
});

// POST login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: 'Email atau password salah' });
    res.json({ message: 'Login berhasil', user: results[0] });
  });
});

module.exports = router;
