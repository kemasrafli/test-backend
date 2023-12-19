const express = require('express')
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const verifyToken = require('./helpers/auth')
const generateSorted = require('./helpers/sorted')

// SQLite Database Setup
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run('CREATE TABLE guests (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, phone TEXT, notes TEXT)');
    db.run('CREATE TABLE admin (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
});

const router = express.Router()

// Note Gallery API
router.get('/sorted', (req, res) => {
    const { rows, columns } = req.query;
    const result = [];

    // Iterate through rows
    for (let i = 1; i <= rows; i++) {
        const rowValues = [];

        // Populate the row with the multiples
        for (let j = 1; j <= columns; j++) {
        rowValues.push(i * j);
        }

        // Push the row into the result array
        result.push(rowValues);
    }

    return res.status(200).json({ httpCode: 200, httpMessage: 'OK', data: result })
});

// Guest Form API
router.post('/guests', (req, res) => {
    const { name, address, phone, notes } = req.body;
  
    db.run('INSERT INTO guests (name, address, phone, notes) VALUES (?, ?, ?, ?)', [name, address, phone, notes], function(err) {
      if (err) {
        return res.status(500).json({ httpCode: 500, httpMessage: 'Error', message: 'Internal Server Error' });
      }
      res.status(200).json({ httpCode: 200, httpMessage: 'OK', message: 'Successfully added Guest!' })
    });
});

// Note Gallery API
router.get('/notes', (req, res) => {
    db.all('SELECT name, notes FROM guests', (err, rows) => {
        if (err) {
            return res.status(500).json({ httpCode: 500, httpMessage: 'Error', message: 'Internal Server Error' });
        }
        res.status(200).json({ httpCode: 200, httpMessage: 'OK', message: '', data: rows });
    });
});

//   Authentication API
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Replace with a secure password hashing mechanism
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username: 'admin' }, 'secret-key');
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Admin API
router.get('/admin/data', verifyToken, (req, res) => {
    db.all('SELECT * FROM guests', (err, rows) => {
        if (err) {
            return res.status(500).json({ httpCode: 500, httpMessage: 'Error', message: 'Internal Server Error' });
        }
        res.status(200).json({ httpCode: 200, httpMessage: 'OK', message: '', data: rows });
    });
});
  
module.exports = router