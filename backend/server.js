// Entry point backend Solace Coffee
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menu', require('./routes/menu'));
app.use('/api/users', require('./routes/users'));
app.use('/api/pesanan', require('./routes/pesanan'));

app.get('/', (req, res) => {
  res.send('Solace Coffee API is running');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
