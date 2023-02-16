const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  empty: Number,
  Pid: Number,
  Data: Number,
  devID: String,
  Type: String,
  sessionID: Number,
  Check: String,
  Meta: mongoose.Schema.Types.Mixed,
  Image: String
});

const Image = mongoose.model('Image', imageSchema);
Image.deleteMany = (filter) => Image.deleteMany(filter);

module.exports = Image;
