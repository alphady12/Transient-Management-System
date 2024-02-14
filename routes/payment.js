const express = require('express');
const db = require('../db'); // Assuming you have a file exporting your MySQL connection
const router = express.Router();

// Create a new payment
router.post('/api/payments', (req, res) => {
  const { booking_id, amount, payment_date } = req.body;
  try {
    db.query(
      'INSERT INTO payment (booking_id, amount, payment_date) VALUES (?, ?, ?)',
      [booking_id, amount, payment_date],
      (err, result) => {
        if (err) {
          console.error('Error creating payment:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ id: result.insertId });
        }
      }
    );
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all payments
router.get('/api/payments', (req, res) => {
  try {
    db.query('SELECT * FROM payment', (err, result) => {
      if (err) {
        console.error('Error fetching payments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get payment by ID
router.get('/api/payments/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('SELECT * FROM payment WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error fetching payment:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(result[0]);
      }
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update payment
router.put('/api/payments/:id', (req, res) => {
  const { id } = req.params;
  const { booking_id, amount, payment_date } = req.body;
  try {
    db.query(
      'UPDATE payment SET booking_id = ?, amount = ?, payment_date = ? WHERE id = ?',
      [booking_id, amount, payment_date, id],
      (err, result) => {
        if (err) {
          console.error('Error updating payment:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ id: id });
        }
      }
    );
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete payment
router.delete('/api/payments/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('DELETE FROM payment WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error deleting payment:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ id: id });
      }
    });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;