const pool = require('../db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, college } = req.body;

    if (!name || !email || !phone || !college) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const query = 'INSERT INTO registrations (name, email, phone, college) VALUES ($1, $2, $3, $4) RETURNING id, created_at';
    const values = [name.trim(), email.trim(), phone.trim(), college.trim()];

    const { rows } = await pool.query(query, values);

    return res.status(201).json({ success: true, message: 'Registration submitted successfully', registration: rows[0] });
  } catch (error) {
    console.error('Server error in /api/register:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
