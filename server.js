require("dotenv").config({ path: ".env.local" });
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, college } = req.body;

    if (!name || !email || !phone || !college) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const query = 'INSERT INTO registrations (name, email, phone, college) VALUES ($1, $2, $3, $4) RETURNING id, created_at';
    const values = [name.trim(), email.trim(), phone.trim(), college.trim()];

    const { rows } = await pool.query(query, values);
    return res.status(201).json({ success: true, message: 'Registration successful', data: rows[0] });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, error: 'Server error saving registration.' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TechX Summit backend running on port ${PORT}`));
