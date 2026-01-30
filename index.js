const express = require('express');
require('dotenv').config();
const db = require('./config/db_config');
const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use('/users',require('./routes/users_R'));


app.listen(port, () => {console.log(`http://${host}:${port}`);});