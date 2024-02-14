const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
//const cors = require('cors');
const router = express.Router();

const db = require ('../db');
const {authenticateToken} = require('../authenticateToken');
const secretKey = require ('../secretkey/secret');


router.get('/api/roles',   (req, res) => {

    try {
  
        db.query('SELECT user_id, role_name FROM role', (err, result) =>{
            
            if(err){
                console.error('Error fetching items:', err);
                res.status(500).json({message:'Internal Server Error'});
            } else {
                res.status(200).json(result);
            }
        });
  
    } catch (error){
        
        console.error('Error loading users', error);
        res.status(500).json({ error: 'Internal Server Error'});
    } 
  });
  
  
    router.get('/api/roles/:id',   (req, res) => {
  
      let role_id = req.params.id;
    
      if (!role_id) {
          return res.status(408).send({ error: true, message: 'Please provide role_id' });
      }
    
      try {
    
          db.query('SELECT * FROM role WHERE user_id = ?', [role_id], (err, result) => {
    
              if (err) {
                  console.error('Error fetching role:', err);
                  res.status(500).json({ message: 'Internal Server Error' });
              } else {
                  res.status(200).json(result);
              }
          });
    
      } catch (error) {
    
          console.error('Error loading role:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  
  
  
  
  router.post('/api/roles', async (req, res) => {
      const { user_id, role_name } = req.body;
      try {
        db.query('INSERT INTO role (user_id, role_name ) VALUES (?, ?)', [user_id, role_name ], (err, result) => {
          if (err) {
            console.error('Error creating role', err);
            res.status(500).json({ message: 'Internal damage' });
          } else {
            res.status(201).json({ message:'Role registered'});
          }
        });
      } catch (error) {
        console.error('Error creating role', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  
  
  router.put('/api/roles/:id', async (req, res) => {
    const { id } = req.params;
    const { user_id, role_name  } = req.body;
    try {
      db.query('UPDATE role SET user_id = ?, role_name = ?  WHERE id = ?', [user_id, role_name, id], (err, result) => {
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
  
  router.delete('/api/roles/:id', async (req, res) => {
    const { id } = req.params;
    try {
      db.query('DELETE FROM role WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error deleting customer', err);
          res.status(500).json({ message: 'Internal damage' });
        } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Customer deleted successfully' });
          } else {
            res.status(404).json({ message: 'Customer not found' });
          }
        }
      });
    } catch (error) {
      console.error('Error deleting customer', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;