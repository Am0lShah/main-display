import { useState, useEffect } from 'react';
import { 
  createGroup, 
  addDeviceToGroup, 
  getGroupDevices ,
  allGroups,
} from '../../services/api.js';
import { PlusIcon } from '@heroicons/react/outline';
import axios from 'axios';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [devices, setDevices] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
const token = localStorage.getItem('token');


 const fetchGroups = async () => {
  try {
    const res = await allGroups();
    setGroups(res.data.groups)
    console.log(res.data.groups);
    
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


 

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
        const res=await axios.post('http://localhost:8000/api/v1/admin/groups',{ name: newGroup },{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        // console.log(res);

        alert(`Group Created`);
        

    } catch (error) {
        console.log(error);
        
    }

    // await createGroup(newGroup);
    setNewGroup('');



    fetchGroups();
  };

  const handleAddDevice = async (groupId, deviceId) => {
    await addDeviceToGroup(deviceId, groupId);
    fetchGroupDevices(groupId);
  };

  const fetchGroupDevices = async (groupId) => {
    const res = await getGroupDevices(groupId);
    setSelectedGroup(res.data);
  };

  useEffect(() => { fetchGroups(); 
   }, []);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-primary-very-light to-white min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary-light">
        <h1 className="text-3xl font-bold mb-8 text-primary-dark flex items-center">
          <svg className="w-8 h-8 mr-3 text-primary-medium" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Group Management
        </h1>

        {/* Create Group Form */}
        <form onSubmit={handleCreateGroup} className="mb-8 p-6 bg-primary-very-light rounded-2xl border-2 border-primary-light">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="New Group Name"
              className="p-3 border-2 border-primary-light rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="bg-primary-medium hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Group
            </button>
          </div>
        </form>

        {/* Groups and Devices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Groups List */}
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-6 text-primary-dark">Groups</h2>
            <div className="space-y-3">
              {groups.map((group) => (
                <div 
                  key={group._id} 
                  className={`p-4 border-2 border-primary-light rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                    selectedGroup?._id === group._id 
                      ? 'bg-primary-light text-primary-dark shadow-lg' 
                      : 'bg-white hover:bg-primary-very-light text-primary-medium'
                  }`}
                  onClick={() => fetchGroupDevices(group._id)}
                >
                  <div className="font-semibold">{group.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Group Devices */}
          {selectedGroup && (
            <div className="col-span-2 bg-primary-very-light rounded-2xl p-6 border-2 border-primary-light">
              <h2 className="text-2xl font-semibold mb-6 text-primary-dark">Devices in {selectedGroup.name}</h2>
              <div className="space-y-4">
                {/* Add Device to Group */}
                <select 
                  onChange={(e) => handleAddDevice(selectedGroup._id, e.target.value)}
                  className="p-3 border-2 border-primary-light rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
                >
                  <option value="">Select device to add</option>
                  {devices.map(device => (
                    <option key={device._id} value={device._id}>
                      {device.name} ({device.deviceId})
                    </option>
                  ))}
                </select>

                {/* Devices List */}
                <div className="bg-white rounded-xl border-2 border-primary-light overflow-hidden">
                  {selectedGroup.allowedDevices.map((device, index) => (
                    <div key={device._id} className={`p-4 border-b border-primary-light hover:bg-primary-very-light transition-colors ${
                      index === selectedGroup.allowedDevices.length - 1 ? 'border-b-0' : ''
                    }`}>
                      <div className="font-medium text-primary-dark">{device.name}</div>
                      <div className="text-sm text-primary-medium">({device.deviceId})</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}