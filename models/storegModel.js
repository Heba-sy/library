const mongoose = require('mongoose');
const storegSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />
const Storeg = mongoose.model('Storeg', storegSchema);
module.exports = Storeg;
