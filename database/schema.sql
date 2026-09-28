-- Skema Database Solace Coffee
-- Sesuai dengan ERD: Users, Menu, Pesanan

CREATE DATABASE IF NOT EXISTS solace_coffee;
USE solace_coffee;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_menu VARCHAR(100) NOT NULL,
  kategori ENUM('Kopi', 'Non-Kopi', 'Snack', 'Makanan Berat', 'Dessert') NOT NULL,
  harga INT NOT NULL,
  deskripsi VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pesanan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  menu_id INT NOT NULL,
  jumlah INT NOT NULL DEFAULT 1,
  metode_pembayaran ENUM('QRIS', 'DANA', 'OVO', 'GoPay', 'Transfer Bank') NOT NULL,
  status ENUM('menunggu', 'diproses', 'selesai', 'dibatalkan') DEFAULT 'menunggu',
  tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (menu_id) REFERENCES menu(id)
);

-- Contoh data awal menu
INSERT INTO menu (nama_menu, kategori, harga, deskripsi) VALUES
('Espresso', 'Kopi', 18000, 'Kopi murni, pekat dan singkat'),
('Cappuccino', 'Kopi', 25000, 'Espresso, susu, dan foam lembut'),
('Matcha Latte', 'Non-Kopi', 27000, 'Teh hijau Jepang dengan susu'),
('French Fries', 'Snack', 22000, 'Kentang goreng renyah'),
('Tiramisu', 'Dessert', 27000, 'Kue kopi khas Italia');
