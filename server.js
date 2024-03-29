const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

let saldo = 10000000000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/api/saldo', (req, res) => {
  console.log("masuk backend", saldo)
  res.json({ saldo });
});

app.post('/api/saldo', (req, res) => {
  const {topup } = req.body;
  if (typeof topup !== 'number') {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  saldo += topup;
  res.json({ saldo });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});


