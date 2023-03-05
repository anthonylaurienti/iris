const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
require('dotenv').config();
const { createTables } = require('./config/sqlite');
const app = express();

const port = process.env.IRIS_PORT || 3000

createTables();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});

module.exports = app;