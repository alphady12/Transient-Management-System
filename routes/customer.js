const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const db = require ('../db');
const secretKey = require ('../secretkey/secret');


// Get all customers
router.get('/api/customers',  (req, res) => {
  try {
    db.query('SELECT * FROM customer', (err, result) =>{
      if(err){
        console.error('Error fetching customers', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Error fetching customers', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Get a single customer by ID
router.get('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('SELECT * FROM customer WHERE id = ?', [id], (err, result) => {
      if(err){
        console.error('Error fetching customer', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json(result[0]);
      }
    });
  } catch (error) {
    console.error('Error fetching customer', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Create a new customer
router.post('/api/customers', (req, res) => {
  const { first_name, last_name, email, phone_number} = req.body;
  try {
    db.query('INSERT INTO customer (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)', [first_name, last_name, email, phone_number], (err, result) => {
      if(err){
        console.error('Error creating customer', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(201).json({message: 'Customer registered succesfully'});
      }
    });
  } catch (error) {
    console.error('Error creating customer', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Update a customer (PUT)
router.put('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number } = req.body;
  try {
    db.query('UPDATE customer SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE id = ?', [first_name, last_name, email, phone_number, id], (err, result) => {
      if (err) {
        console.error('Error updating customer', err);
        res.status(500).json({ message: 'Internal damage' });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.error('Error updating customer', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Delete a customer
router.delete('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('DELETE FROM customer WHERE id = ?', [id], (err, result) => {
      if(err){
        console.error('Error deleting customer', err);
        res.status(500).json({message:'Internal damage'});
      } else {
        res.status(200).json({message: 'User deleted succesfully'});
      }
    });

    } catch (error) {
      console.error('Error deleting customer', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });
  
  module.exports = router;
