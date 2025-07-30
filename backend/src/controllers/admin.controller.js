import {Group} from '../models/group.model.js';
import {User} from '../models/user.model.js'
import {Device} from '../models/device.model.js';
import { Message } from '../models/message.model.js';

// Admin creates a new group
const createGroup = async (req, res) => {
  try {

    console.log(req.body);
    
    const { name } = req.body;
    const adminId = req.user._id; // From JWT middleware

    // Verify admin role
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ error: 'Only admins can create groups' });
    // }

    const group = new Group({
      name,
      createdBy: adminId
    });

    await group.save();
    res.status(201).json({ success: true, group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin registers a new user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can register users' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin adds user to a group
const addUserToGroup = async (req, res) => {
  try {
    const { userId, groupId } = req.body;

    // Verify admin permissions
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const group = await Group.findById(groupId);
    const user = await User.findById(userId);

    if (!group || !user) {
      return res.status(404).json({ error: 'Group or user not found' });
    }

    // Add user to group if not already a member
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.json({ success: true, message: 'User added to group' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





const registerDevice = async (req, res) => {
  try {
    const { deviceId, name, groupName } = req.body;

    // 1. Check if all fields are provide

    if (!deviceId || !name || !groupName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const deviceAllready=await Device.findOne({deviceId:deviceId});

    if(deviceAllready){
      return res.status(404).json({ success: false, message: "Device Allready Exits" });

    }

    console.log("1");

    // 2. Use `findOne` instead of `find` to get a single group
    const group = await Group.findOne({ name: groupName });

    // 3. Check if group exists
    if (!group) {
      return res.status(404).json({ success: false, message: "Group Not Found" });
    }

    // 4. Create and save the device
    const device = new Device({
      deviceId,
      name,
      groupsName: groupName,
      createdBy: req.user._id
    });

    console.log("2");

    const deviceRes = await device.save();

    // 5. Add device ID to group's allowedDevices if not already included
    if (!group.allowedDevices.includes(deviceRes._id)) {
      group.allowedDevices.push(deviceRes._id);
      await group.save();
    }

    console.log("3");

    return res.status(201).json({ success: true, device: deviceRes });

  } catch (err) {
    console.error("Error registering device:", err);
    res.status(500).json({ success: false, error: 'Device registration failed' });
  }
};



const myDevices=async(req,res)=>{

    try {
      const devices= await Device.find({createdBy:req.user._id});

      if(!devices){
        res.status(500).json({ error: 'No any device' });
      }

      res.status(201).json({success:true,devices});

    } catch (error) {
    res.status(500).json({ error});
      
    }

}


const deleteDevice=async (req,res)=>{
      try {
        // console.log(req.params.id);
        
        const device= await Device.findByIdAndDelete(req.params.id)
        if (!device) {
    res.status(500).json({ success:false,"message":"Device Not Found" });
          
    
        }
        res.status(201).json({status:true})
        
      } catch (error) {
    res.status(500).json({ error });
        
      }
}




// Approve/Reject a device
const approveDevice = async (req, res) => {
  try {
    const { deviceId, approve } = req.body;
    const device = await Device.findOneAndUpdate(
      { deviceId },
      { approved: approve },
      { new: true }
    );
    res.json({ success: true, device });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};

// Add device to group
const addDeviceToGroup = async (req, res) => {
  try {
    const { deviceId, groupId } = req.body;
    const group = await Group.findById(groupId);
    const device = await Device.findOne({ deviceId });

    if (!group || !device) {
      return res.status(404).json({ error: 'Group/Device not found' });
    }

    if (!group.allowedDevices.includes(device._id)) {
      group.allowedDevices.push(device._id);
      await group.save();
    }

    res.json({ success: true, message: 'Device added to group' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add device' });
  }
};

const myGroups= async(req,res)=>{
    try {

      const groups= await Group.find({createdBy:req.user._id});

      if (!groups) {
    res.status(500).json({ error: 'Groups not found' });
        
      }


      res.status(201).json({success:true,groups})
      
    } catch (error) {
      
    }
}

const myNotices=async(req,res)=>{
  try {
    
    const messages=await Message.find({createdBy:req.user._id});


    res.status(201).json({ success:true,messages });

  } catch (error) {
    res.status(500).json({ error: 'Failed to load Notices' })
  }
}



const deviceNotices = async (req, res) => {
  try {
    // console.log(req.params);

    // Find the device by name
    const device = await Device.findOne({ name: req.params.name });

    // Check if the device exists
    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }

    // Make sure device.groupsName is an array and has at least one item
    if (!device.groupsName || device.groupsName.length === 0) {
      return res.status(400).json({ success: false, message: 'No group assigned to this device' });
    }

    // Find messages for the first group name
    const messages = await Message.find({ group: device.groupsName[0], formate:"Text" }).limit(12);

    res.status(200).json({ success: true, messages });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to load Notices' });
  }
};


const deviceNoticesImages = async (req, res) => {
  try {
    // console.log(req.params);

    // Find the device by name
    const device = await Device.findOne({ name: req.params.name });

    // Check if the device exists
    if (!device) {
      return res.status(404).json({ success: false, message: 'Device not found' });
    }

    // Make sure device.groupsName is an array and has at least one item
    if (!device.groupsName || device.groupsName.length === 0) {
      return res.status(400).json({ success: false, message: 'No group assigned to this device' });
    }

    // Find messages for the first group name
    const messages = await Message.find({
  group: device.groupsName[0],
  formate: { $in: ["image", "video"] }
}).limit(5);


    res.status(200).json({ success: true, messages });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to load Notices' });
  }
};





export {
    createGroup,
registerUser,
addUserToGroup,
registerDevice,
approveDevice,
addDeviceToGroup,
myDevices,
myGroups,
deleteDevice,
myNotices,
deviceNotices,
deviceNoticesImages
}