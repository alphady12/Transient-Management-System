const express = require('express');
const db = require('../db'); // Assuming you have a file exporting your MySQL connection
const router = express.Router();


// Fetch all room types
router.get('/api/room-types', (req, res) => {
  try {
    db.query('SELECT * FROM room_type', (error, results, fields) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error fetching room types', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch a single room type by ID
router.get('/api/room-types/:id', (req, res) => {
  const { id } = req.params;

  try {
    db.query('SELECT * FROM room_type WHERE id = ?', [id], (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).send('Room type not found');
      }
    });
  } catch (error) {
    console.error('Error fetching room type', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new room type
router.post('/api/room-types', (req, res) => {
  const { name, description } = req.body;

  try {
    db.query('INSERT INTO room_type (name, description) VALUES (?, ?)', [name, description], (error, results, fields) => {
      if (error) throw error;
      res.status(201).json({ id: results.insertId });
    });
  } catch (error) {
    console.error('Error creating room type', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a room type //authenticateToken,
router.put('/api/room-types/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    db.query('UPDATE room_type SET name = ?, description = ? WHERE id = ?', [name, description, id], (error, results, fields) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        res.status(200).send('Room type updated successfully');
      } else {
        res.status(404).send('Room type not found');
      }
    });
  } catch (error) {
    console.error('Error updating room type', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a room type // authenticateToken,
router.delete('/api/room-types/:id', (req, res) => {
  const { id } = req.params;

  try {
    db.query('DELETE FROM room_type WHERE id = ?', [id], (error, results, fields) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        res.status(200).send({message:'Room type deleted successfully'});
      } else {
        res.status(404).send('Room type not found');
      }
    });
  } catch (error) {
    console.error('Error deleting room type', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
  module.exports = router;