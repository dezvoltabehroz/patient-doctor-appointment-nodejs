const ChatModel = require('../models/chat_model.js');
const MessageModel = require('../models/message_model.js');


exports.isUserInChat = async (chatId, userId) => await ChatModel.findOne({ $and: [{ _id: chatId }, { users: { $in: [userId] } }], });

exports.getChat = async (chatId) => await ChatModel.findById(chatId);

exports.getChatMessages = async (chatId) => await MessageModel.find({ chatId });

exports.createNewChat = async (users) => {
  const newChat = await ChatModel.create({ users });
  return newChat;
};

exports.addNewMessageInGivenChat = async (chatId, sender, message, messageType,) => {
  const chat = await ChatModel.findById(chatId);
  if (chat) {
    console.log(message, messageType, "ZZZZZZZ")
    const newMessage = await MessageModel.create({ chatId, sender, message, messageType, });
    return newMessage;
  }
  throw new Error('Chat does not exist');
};
