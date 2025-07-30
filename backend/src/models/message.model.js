// message.model.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  group: { type: String },
  formate:{type:String},
  url:{type:String},
  createdBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: { type: Date, default: Date.now }
});

export const Message = mongoose.model('Message', messageSchema);