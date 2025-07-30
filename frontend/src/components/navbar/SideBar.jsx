// components/Sidebar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [isSettingPanel, setSettingPanel] = useState(false);

  const dispatch = useDispatch();
  
  const signout = async () => {
    const res = await axios.post(`${import.meta.env.VITE_LOGOUT}`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 200) {
      dispatch(logout());
      window.location.reload();
    }
  };

  const settingHandler = () => {
    setSettingPanel(!isSettingPanel);
  };

  return (
    <div className="bg-primary-very-light shadow-lg h-screen p-4 w-64 fixed border-r-2 border-primary-light">
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-primary-light mr-2 w-10 h-10 overflow-hidden border-2 border-primary-medium">
          <img 
            className="w-full h-full object-cover" 
            src={user?.avatar} 
            alt="User avatar" 
          />
        </div>
        <div>
          <h5 className="font-medium text-primary-dark mb-0">{user?.username}</h5>
          <p className="text-primary-medium text-sm">{user?.email}</p>
        </div>
      </div>
      <hr className="my-2 border-primary-light" />
      
      <NavLink 
        to="/dashboard" 
        className={({isActive}) => 
          `block py-2 px-3 rounded-md transition-colors ${isActive ? "text-primary-dark bg-primary-light" : "text-primary-medium hover:text-primary-dark hover:bg-primary-light"}`
        }
      >
        Dashboard
      </NavLink>

      <ul className="space-y-1 mt-2">
        <li>
          <NavLink 
            to="/friends" 
            className={({isActive}) => 
              `block py-2 px-3 rounded-md transition-colors ${isActive ? "text-primary-dark bg-primary-light" : "text-primary-medium hover:text-primary-dark hover:bg-primary-light"}`
            }
          >
            Friends
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/mypost" 
            className={({isActive}) => 
              `block py-2 px-3 rounded-md transition-colors ${isActive ? "text-primary-dark bg-primary-light" : "text-primary-medium hover:text-primary-dark hover:bg-primary-light"}`
            }
          >
            Posts
          </NavLink>
        </li>
        {['Event', 'Watch Videos', 'Photos', 'Files', 'Marketplace'].map(item => (
          <li key={item} className="block py-2 px-3 rounded-md text-primary-medium hover:text-primary-dark hover:bg-primary-light transition-colors">{item}</li>
        ))}
      </ul>

      <h6 className="font-bold mt-4 text-primary-dark">Pages You Like</h6>
      <ul className="space-y-1 mt-2">
        {['Football FC', 'Badminton Club', 'UI/UX Community', 'Web Designer'].map(item => (
          <li key={item} className="block py-2 px-3 text-primary-medium hover:text-primary-dark hover:bg-primary-light transition-colors rounded-md">
            {item} <span className="text-primary-light">(120)</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 relative">
        <button onClick={settingHandler} className="p-1 hover:bg-primary-light rounded transition-colors">
          <img src="gear.png" alt="setting" className="w-6 h-6" />
        </button>
        
        {isSettingPanel && (
          <div className="absolute bottom-full left-0 mb-2 w-48 bg-primary-very-light rounded-md shadow-lg py-1 z-10 border border-primary-light">
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium text-primary-dark">Settings</h2>
            </div>
            <button 
              onClick={signout} 
              className="block w-full text-left px-4 py-2 text-primary-medium hover:bg-primary-light hover:text-primary-dark transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;