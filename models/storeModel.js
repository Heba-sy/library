const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    mangerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please enter manger'],
    },
    desc: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Please enter name'],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />

storeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'mangerId',
    select: '-_id',
  });
  next();
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
