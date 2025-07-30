import { useState, useEffect } from 'react';
import { 
  registerDevice, 
  approveDevice, 
  deleteDevice ,
  allDevices
} from '../../services/api.js';
import { CheckIcon, XIcon, TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ deviceId: '', name: '',groupName:'' });
  const [status,SetStatus]=useState('');

  const fetchDevices = async () => {
    // Implement API call to fetch devices
    const res =await allDevices();
    
    console.log(res.data.devices);
    setDevices(res.data.devices)
    
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res= await registerDevice(newDevice);
    
    console.log(res);

    if(res.status==201){
      alert(`Device ${res.data.device.name} is successfully registered`);
      
    }
    



    setNewDevice({ deviceId: '', name: '',groupName:'' });
    fetchDevices();
  };

  const handleApprove = async (deviceId, approve) => {
    await approveDevice(deviceId, approve);
    fetchDevices();
  };

  const handleDelete = async (deviceId) => {
    const res=await deleteDevice(deviceId);
    if(res.status==201){
      alert("Device Deleted");
    }
    else{
      alert("Enable to Delete");

    }
    fetchDevices();
  };

  useEffect(() => { fetchDevices(); }, []);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-primary-very-light to-white min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary-light">
        <h1 className="text-3xl font-bold mb-8 text-primary-dark flex items-center">
          <svg className="w-8 h-8 mr-3 text-primary-medium" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Device Management
        </h1>
        
        {/* Register New Device */}
        <form onSubmit={handleRegister} className="mb-8 p-6 bg-primary-very-light rounded-2xl border-2 border-primary-light">
          <h2 className="text-2xl font-semibold mb-6 text-primary-dark">Register New Device</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Device ID"
              className="p-3 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
              value={newDevice.deviceId}
              onChange={(e) => setNewDevice({...newDevice, deviceId: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Device Name"
              className="p-3 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
              value={newDevice.name}
              onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Device Group"
              className="p-3 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
              value={newDevice.groupName}
              onChange={(e) => setNewDevice({...newDevice, groupName: e.target.value})}
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-primary-medium hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Register Device
          </button>
        </form>

        {/* Devices List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl overflow-hidden border-2 border-primary-light">
            <thead>
              <tr className="bg-primary-very-light">
                <th className="py-4 px-6 text-left text-sm font-semibold text-primary-dark uppercase tracking-wider">Device ID</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-primary-dark uppercase tracking-wider">Name</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-primary-dark uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-light">
              {devices.map((device, index) => (
                <tr key={device._id} className={`hover:bg-primary-very-light transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-primary-very-light/30'}`}>
                  <td className="py-4 px-6 text-sm font-medium text-primary-dark">{device.deviceId}</td>
                  <td className="py-4 px-6 text-sm text-primary-medium">{device.name}</td>
                  <td className="py-4 px-6 flex space-x-3">
                    {!device.approved && (
                      <button
                        onClick={() => handleApprove(device.deviceId, true)}
                        className="text-primary-medium hover:text-primary-dark transition-colors p-2 rounded-lg hover:bg-primary-light"
                        title="Approve"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(device._id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}