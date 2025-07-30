import { Device } from '../models/device.model.js';
import { Group } from '../models/group.model.js';
import { Message } from '../models/message.model.js';
import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js';
import mongoose from 'mongoose';

let io;

const initializeSocket = (socketIO) => {
  io = socketIO;

  // Improved authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      let user;


      const ip = socket.handshake.headers['x-forwarded-for'] || 
                 socket.handshake.address;
      
      console.log(`Connection attempt from IP: ${ip}`);
      
      if (token) {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        user = await User.findById(decoded._id).select('-password');
        if (!user) return next(new Error("User not found"));
      } else {
        const deviceName = socket.handshake.auth.name;
        if (!deviceName) return next(new Error("No authentication provided"));
        
        const device = await Device.findOne({ name: deviceName });
        if (!device) return next(new Error("Device not found"));
        user = device;
      }

      socket.user = user;
      next();
    } catch (err) {
      console.error("Authentication error:", err);
      next(new Error("Authentication failed"));
    }
  });

  io.on('connection', async (socket) => {
    try {
      if (socket.user?.isAdmin) {
        console.log(`Admin ${socket.user._id} connected`);
        const groups = await Group.find({ members: socket.user._id });
        groups.forEach(group => {
          socket.join(group._id.toString());
          console.log(`Admin joined group ${group._id}`);
        });
      } else {
        console.log(`Device ${socket.user?.name || 'unknown'} connected`);
        if (socket.user?.groupsName?.length) {
          socket.user.groupsName.forEach(groupName => {
            // const gName= await Group.findById(groupId);
            socket.join(groupName.toString());
            console.log(`Device joined group ${groupName}`);
          });
        }
      }

      // Improved message handling
      socket.on("send_message", async (data) => {
        try {
          if (!data?.groupName || !data?.newMessage) {
            return socket.emit("error", "Invalid message format");
          }
            console.log(data);
            
          // Verify the sender has access to this group
          if (socket.user?.isAdmin) {
            const group = await Group.findOne({
              name: data.groupName,
              members: socket.user._id
            });
            if (!group) {
              return socket.emit("error", "Not authorized for this group");
            }
          } else {
            // For devices, check if they're assigned to this group
            if (!socket.user?.groups?.includes(data.groupName)) {
              return socket.emit("error", "Device not assigned to this group");
            }
          }

          // Save message to database
          const message = new Message({
            content: data.newMessage,
            sender: socket.user._id,
            group: data.groupName,
            formate:data.activeTab,
            url:data.fileUrl,
            createdBy:socket.user._id,
            senderType: socket.user.isAdmin ? 'admin' : 'device'
          });
          
          await message.save();

          // Broadcast to group with proper structure
          io.to(data.groupName.toString()).emit("receive_message", {
            _id: message._id,
            content: message.content,
            sender: {
              _id: socket.user._id,
              name: socket.user.name || socket.user.username,
              type: socket.user.isAdmin ? 'admin' : 'device'
            },
            createdAt: message.createdAt,
            group: data.groupName
          });

        } catch (err) {
          console.error("Message error:", err);
          socket.emit("error", "Failed to send message");
        }
      });

      socket.on('disconnect', () => {
        console.log(`User ${socket.user?._id || 'unknown'} disconnected`);
      });

    } catch (err) {
      console.error("Connection error:", err);
      socket.emit("error", "Connection error");
      socket.disconnect();
    }
  });

  return io;
};

export { initializeSocket };