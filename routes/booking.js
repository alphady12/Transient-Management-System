const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const db = require ('../db');
//const {authenticateToken} = require ('');

// Get all reservations
router.get('/api/booking',  (req, res) => {
    try {
      db.query('SELECT * FROM booking', (err, result) =>{
        if(err){
          console.error('Error fetching Booking', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.error('Error fetching Booking', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  // Get a single reservation by ID
  router.get('/api/Booking/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query('SELECT * FROM booking WHERE id = ?', [id], (err, result) => {
        if(err){
          console.error('Error fetching Booking', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json(result[0]);
        }
      });
    } catch (error) {
      console.error('Error fetching Booking', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  //create booking
  router.post('/api/booking', (req, res) => {
    const { customer_id, room_id, check_in_date, check_out_date } = req.body;
    try {
      db.query('INSERT INTO booking (customer_id, room_id, check_in_date, check_out_date) VALUES (?, ?, ?, ?)', [customer_id, room_id, check_in_date, check_out_date], (err, result) => {
        if (err) {
          console.error('Error creating Booking', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(201).json({id: result.insertId});
        }
      });
    } catch (error) {
      console.error('Error creating reservation', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
});
  
  // Update a reservation
  router.put('/api/booking/:id', (req, res) => {
    const { id } = req.params;
    const { customer_id, room_id, check_in_date, check_out_date } = req.body;
    try {
      db.query('UPDATE booking SET customer_id = ?, room_id = ?, check_in_date = ?, check_out_date = ? WHERE id = ?', [customer_id, room_id, check_in_date, check_out_date, id], (err, result) => {
        if (err) {
          console.error('Error updating reservation', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json({id: id});
        }
      });
    } catch (error) {
      console.error('Error updating reservation', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
});
  
 // Delete a booking
router.delete('/api/booking/:id', (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM booking WHERE id = ?', [id], (err, result) => {
        if(err){
          console.error('Error deleting booking', err);
          res.status(500).json({message:'Internal damage'});
        } else {
          res.status(200).json({id: id});
        }
      });
    } catch (error) {
      console.error('Error deleting booking', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  module.exports = router;