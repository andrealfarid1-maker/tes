// Konfigurasi koneksi database MySQL
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'solace_coffee'
});

db.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err.message);
    return;
  }
  console.log('Terhubung ke database solace_coffee');
});

module.exports = db;
