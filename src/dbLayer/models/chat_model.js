const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  },
  { timestamps: true },
);

module.exports = mongoose.model('chats', ChatSchema);