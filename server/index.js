require('dotenv').config();
const knexConfig = require('./knexfile');
const ENV = process.env.ENV || "development";
const port = process.env.PORT || 3000;

// Imports
const express = require('express');
const app = express();
const router = express.Router();
const knex = require('knex')(knexConfig[ENV]);
const pg = require('pg');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const moment = require('moment');
moment().format();

let now = moment().unix();
// console.log(now);

// Config


// Express Route Setup
app.use('/api', router);


// bcrypt test
const password = 'testPassword'; // testing bcrypt

bcrypt.genSalt(10, (err, salt) => {
  // console.log('salt beginning: ', salt);
  bcrypt.hash(password, salt, (err, hash) => {
      // Store hash in your password DB.
      // console.log('salt in hash: ', salt);
      // console.log(hash);
  });
});

// Before login + Users
router.post('/', (req, res) => {
  res.send('this is home');
})


router.get('/signup', (req, res) => {
  res.send('this is signup');
})

router.post('/signup', (req, res) => {
  res.send('this is signup');
})

router.get('/login', (req, res) => {
  res.send('this is login')
})



// Users
router.get('/users', (req, res) => {
  knex.select().from('users')
  .then((data) => {
    console.log(data);
    res.json(data);
    console.log(moment(data.created_at).utc());
  })
})





//** After login
router.get('/dashboard', (req, res) => {
  res.send('this is dashboard');
})

// Customer
router.get('/customer', (req, res) => {
  res.send('this is customer');
})

router.get('/customer/new', (req, res) => {
  res.send('this is customer');
})

router.post('/customer/new', (req, res) => {
  res.send('this is customer');
})

router.get('/customer/:id', (req, res) => {
  res.send('this is customer');
})

router.put('/customer/:id', (req, res) => {
  res.send('this is customer');
})

router.delete('/customer/:id', (req, res) => {
  res.send('this is customer');
})



// Supplier
router.get('/supplier', (req, res) => {
  res.send('this is supplier');
})

router.get('/warehouse', (req, res) => {
  res.send('this is warehouse');
})

router.get('/order', (req, res) => {
  res.send('this is order');
})




app.listen(port, () => {
  console.log('Server listening on port: ', port);
})