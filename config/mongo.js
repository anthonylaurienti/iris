const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);

const connectToMongoDB = () => {
  const mongoDbUri = process.env.MONGODB_URI_IRIS || 'mongodb://localhost:27017/test';
  const DATABASE = process.env.MONGODB_DATABASE_IRIS || 'test';
  mongoose.connect(mongoDbUri+DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to MongoDB');
  });
};

module.exports = { connectToMongoDB };