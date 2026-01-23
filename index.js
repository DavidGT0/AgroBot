const express = require('express');
require('dotenv').config();
const db = require('./config/db_config');
const app = express();
const port = process.env.PORT;
const host = process.env.HOST;



app.listen(port, () => {console.log(`http://${host}:${port}`);});