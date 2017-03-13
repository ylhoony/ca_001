require('dotenv').config();
const knexConfig = require('./knexfile');
const ENV = process.env.ENV || "development";

// console.log(process.env);

// Imports
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

const pg = require('pg');
const knex = require('knex')(knexConfig[ENV]);






// Config

const port = process.env.PORT || 3000;







app.listen(port, () => {
  console.log('Server listening on port: ', port);
})