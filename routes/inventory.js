const express = require('express');
const router = express.Router();
const db = require('../db');


// Get all customers
router.get('/api/inventory',  (req, res) => {
  try {
    db.query('SELECT * FROM inventory', (err, result) =>{
      if(err){
        console.error('Error fetching inventory', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Error fetching inventory', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


// Get a inventory by ID
router.get('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('SELECT * FROM inventory WHERE id = ?', [id], (err, result) => {
      if(err){
        console.error('Error fetching customer', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json(result[0]);
      }
    });
  } catch (error) {
    console.error('Error fetching inventory', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});




// Create inventory item
router.post('/api/inventory', (req, res) => {
  const { room_type_id, quantity } = req.body;
  try {
    db.query(
      'INSERT INTO inventory (room_type_id, quantity) VALUES (?, ?)',
      [room_type_id, quantity],
      (err, result) => {
        if (err) {
          console.error('Error creating inventory item:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ id: result.insertId });
        }
      }
    );
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update inventory item
router.put('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const { room_type_id, quantity } = req.body;
  try {
    db.query(
      'UPDATE inventory SET room_type_id = ?, quantity = ? WHERE id = ?',
      [room_type_id, quantity, id],
      (err, result) => {
        if (err) {
          console.error('Error updating inventory item:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ id: id });
        }
      }
    );
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete inventory item
router.delete('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('DELETE FROM inventory WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error deleting inventory item:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ id: id });
      }
    });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;