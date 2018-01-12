const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  first_name: String,
  last_name: String,
}, {
  collection: 'users',
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);
