// Route untuk membuat dan melihat pesanan
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST buat pesanan baru (checkout)
router.post('/', (req, res) => {
  const { user_id, menu_id, jumlah, metode_pembayaran } = req.body;
  const sql = 'INSERT INTO pesanan (user_id, menu_id, jumlah, metode_pembayaran) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, menu_id, jumlah, metode_pembayaran], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Pesanan berhasil dibuat' });
  });
});

// GET semua pesanan (untuk admin)
router.get('/', (req, res) => {
  const sql = `
    SELECT pesanan.id, users.nama, menu.nama_menu, pesanan.jumlah,
           pesanan.metode_pembayaran, pesanan.status, pesanan.tanggal
    FROM pesanan
    JOIN users ON pesanan.user_id = users.id
    JOIN menu ON pesanan.menu_id = menu.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
