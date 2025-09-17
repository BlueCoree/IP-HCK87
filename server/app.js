console.log({ env: process.env.NODE_ENV });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const routes = require('./routes')
const cors = require('cors')
const app = express();
const error = require('./middlewares/errorHandler');
// // const corsOption = {
// //     origin: 'http://localhost:5173/',
// //     optionsSuccessStatus: 200
// }

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(routes);
app.use(error);


module.exports = app