console.log({ env: process.env.NODE_ENV });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    console.log('Using .env file');
    console.log({ env: process.env.JWT_SECRET });
}
const express = require('express');
const routes = require('./routes')
const cors = require('cors')
const app = express();
const error = require('./middlewares/errorHandler');

app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(routes);
app.use(error);


module.exports = app