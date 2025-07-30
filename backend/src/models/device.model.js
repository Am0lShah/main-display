import mongoose from 'mongoose'

const DeviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true }, // MAC/IP/IMEI
  name: { type: String, required: true }, // Custom identifier
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approved: { type: Boolean, default: false }, // Admin must approve
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  groupsName:[{type:String}]
}, { timestamps: true });

export const Device = mongoose.model('Device', DeviceSchema);