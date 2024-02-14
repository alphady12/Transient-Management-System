const express = require('express');
const mysql = require('mysql2');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
//const cors = require('cors');
//app.use(express.json());

const db = require('./db');


const customers = require('./routes/customer');
const booking = require('./routes/booking');
const room = require('./routes/room');
const payment = require('./routes/payment');
const room_type = require('./routes/room_type');
const user = require('./routes/user');
const role = require('./routes/role');
const inventory = require('./routes/inventory');

app.use(bodyParser.json());

app.use(customers);
app.use(booking);
app.use(room);
app.use(payment);
app.use(user);
app.use(room_type);
app.use(role);
app.use(inventory);

const PORT = 3001;

app.get('/api', (req, res) => {
  res.json({ message: 'Transient Management System' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3001}/api`);
}); 
