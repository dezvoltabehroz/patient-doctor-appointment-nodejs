const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chats',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    message: { type: String },
    messageType: { type: String, enum: ['text', 'audio', 'image', 'pdf'] },
  },
  { timestamps: true },
);

module.exports = mongoose.model('messages', MessageSchema);