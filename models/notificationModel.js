const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema(
  {
    // <creating-property-schema />
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please enter user'],
    },
    message: {
      type: String,
      required: [true, 'Please enter message'],
    },
  },
  { timestamps: true, versionKey: false },
);
// <creating-function-schema />
notificationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: '-_id',
  });
  next();
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
