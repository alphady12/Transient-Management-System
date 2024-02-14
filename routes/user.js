const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Assuming you have a file named db.js where you establish your database connection
const { authenticateToken } = require('../authenticateToken'); // Assuming you have authentication middleware defined in a file named authentication.js

const secretKey = require ('../secretkey/secret'); // Define your secret key here

router.post('/api/users', async (req, res) => {
  try {
    const { name, email, phone_number, password } = req.body; 
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = 'INSERT INTO user (name, email, phone_number, password) VALUES (?, ?, ?, ?)';
    await db.promise().execute(insertUserQuery, [name, email, phone_number, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const getUserQuery = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await db.promise().execute(getUserQuery, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email}, secretKey, {expiresIn: '1h' });

    res.status(200).json({ token });
    
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/users/:id', authenticateToken, (req, res) => {
  let user_id = req.params.id;

  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }

  try {
    db.query('SELECT id, name, email, phone_number FROM users WHERE id = ?', user_id, (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Error loading user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.query('DELETE FROM user WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ id: id });
      }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
