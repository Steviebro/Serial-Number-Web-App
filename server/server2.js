const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to your desired port

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'your-mysql-host', // Change this to your MySQL host
  user: 'your-mysql-username', // Change this to your MySQL username
  password: 'your-mysql-password', // Change this to your MySQL password
  database: 'your-database-name' // Change this to your MySQL database name
});

db.connect(err => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Routes for Account Management
app.post('/create-account', (req, res) => {
  const { email, password, fullName, userType } = req.body;
  const newAccount = { email, password, fullName, userType };

  // Insert the new account into the MySQL database
  db.query('INSERT INTO Account SET ?', newAccount, (err, result) => {
    if (err) {
      console.error('Error creating account:', err);
      res.status(500).json({ error: 'Error creating account' });
    } else {
      console.log('Account created:', result);
      res.json(newAccount);
    }
  });
});

app.post('/edit-account', (req, res) => {
  const { email, fullName, userType } = req.body;

  // Update the account in the MySQL database
  db.query('UPDATE Account SET fullName = ?, userType = ? WHERE email = ?', [fullName, userType, email], (err, result) => {
    if (err) {
      console.error('Error updating account:', err);
      res.status(500).json({ error: 'Error updating account' });
    } else {
      console.log('Account updated:', result);
      res.json({ email, fullName, userType });
    }
  });
});

app.post('/delete-account', (req, res) => {
  const { email } = req.body;

  // Delete the account from the MySQL database
  db.query('DELETE FROM Account WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Error deleting account:', err);
      res.status(500).json({ error: 'Error deleting account' });
    } else {
      console.log('Account deleted:', result);
      res.json({ email });
    }
  });
});

// Route for Listing Serial Numbers
app.get('/list-serial-numbers/:clientEmail', (req, res) => {
  const clientEmail = req.params.clientEmail;

  // Fetch serial numbers from the MySQL database based on clientEmail
  db.query('SELECT * FROM License WHERE clientEmail = ?', [clientEmail], (err, results) => {
    if (err) {
      console.error('Error fetching serial numbers:', err);
      res.status(500).json({ error: 'Error fetching serial numbers' });
    } else {
      console.log('Serial numbers fetched:', results);
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});