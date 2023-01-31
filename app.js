const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
require('dotenv').config();
const { connectToMongoDB } = require('./config/db');

const app = express();

const port = process.env.IRIS_PORT || 3000

connectToMongoDB();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});

module.exports = app;