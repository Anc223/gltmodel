const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
  filename: String,
  uploadDate: Date,
  contentType: String,
});

module.exports = mongoose.model('Model', ModelSchema);
