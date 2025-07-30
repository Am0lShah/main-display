import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  allowedDevices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
}, { timestamps: true });

export const Group = mongoose.model('Group', GroupSchema);
