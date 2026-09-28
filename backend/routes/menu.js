// Route untuk mengelola data menu
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET semua menu
router.get('/', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST tambah menu baru (untuk admin)
router.post('/', (req, res) => {
  const { nama_menu, kategori, harga, deskripsi } = req.body;
  const sql = 'INSERT INTO menu (nama_menu, kategori, harga, deskripsi) VALUES (?, ?, ?, ?)';
  db.query(sql, [nama_menu, kategori, harga, deskripsi], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Menu berhasil ditambahkan' });
  });
});

module.exports = router;
