import express from 'express'
const router = express.Router();
import {createGroup,
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

} from '../controllers/admin.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Protect all routes with admin auth

// Device Management
router.post('/devices/register',verifyJWT, registerDevice);
router.post('/devices/approve',verifyJWT, approveDevice);
router.get('/devices/all',verifyJWT, myDevices);
router.delete('/devices/device/:id',verifyJWT,deleteDevice);

router.get('/devices/notices/:name',deviceNotices);
router.get('/devices/notices-image-video/:name',deviceNoticesImages);


// router.delete('/devices/:deviceId', deleteDevice);
router.get('/messages',verifyJWT,myNotices);


// Group Management
router.post('/groups',verifyJWT, createGroup);
router.get('/groups/all',verifyJWT, myGroups);

router.post('/groups/add-device',verifyJWT, addDeviceToGroup);
// router.get('/groups/:groupId', getGroupDevices);

export default  router;