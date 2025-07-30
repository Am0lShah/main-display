import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/v1/admin',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Device Operations 
export const registerDevice = (deviceData) =>{ const res=API.post('/devices/register', deviceData); return res;  };
export const approveDevice = (deviceId, approve) => API.post('/devices/approve', { deviceId, approve });
export const deleteDevice = (deviceId) =>{const res= API.delete(`/devices/device/${deviceId}`); return res};
export const allDevices=()=>{
      const res = API.get('/devices/all');

      return res;
}

export const myNotices=()=>{
      const res = API.get('/messages');

      return res;
}

// Group Operations
export const createGroup = (groupName) => API.post('/groups', { name: groupName });
export const addDeviceToGroup = (deviceId, groupId) => API.post('/groups/add-device', { deviceId, groupId });
export const getGroupDevices = (groupId) => API.get(`/groups/${groupId}`);
export const allGroups =()=>{ 
  
  const res=API.get('/groups/all'); 
  return res;

}