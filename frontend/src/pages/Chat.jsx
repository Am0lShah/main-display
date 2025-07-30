import { useEffect, useState } from 'react';
import { connectSocket, getSocket } from '../services/socket';
import { useSelector } from 'react-redux';
import {myNotices} from '../services/api.js'
import {setTextData} from '../redux/slices/userDataSlice.js'
import { useDispatch } from 'react-redux';


export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [groupName,setGroupName]=useState('');
  const [activeTab,setActiveTab]=useState('Text');
  const [error, setError] = useState('');

  const dispatch=useDispatch();




const user=useSelector((state) => state.auth.user);
// console.log(user);   6883445f053d5040ad21eb84

  const fetchNotices= async()=>{
    const res = await myNotices();

    // console.log(res.data.messages);
    setMessages(res.data.messages)
    dispatch(setTextData(res.data.messages));
  }

  useEffect(()=>{
    fetchNotices();
  },[])

  useEffect(() => {
    const socket = connectSocket(localStorage.getItem('token'));

    socket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
      // console.log(message);
      
    });

    

    socket.on('error', (err) => {
      setError(err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = () => {
    try {
      const socket = getSocket();
      socket.emit('send_message', {newMessage,groupName,activeTab});
      setNewMessage('');
    } catch (err) {
      setError(err.message);
    }
  };


  const handleGroupIdChange = (e) => {
    setGroupName(e.target.value);
  };


  

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Send Notification</h2>
      
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="mb-4 h-64 overflow-y-auto border p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            
            <span>{msg.content}</span>
            <div className="text-xs text-gray-500">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {user.isAdmin && <>
        <h2 className="text-xl font-bold mb-4">Send Notice To Group</h2>

          <input
        type="text"
        value={groupName}
        onChange={handleGroupIdChange}
        placeholder="Group Name"
        className="w-full my-2 py-2 pl-10 text-sm text-gray-700 bg-white rounded-lg focus:outline-none border-1 border-red-100"
      />
      {/* <button
        onClick={handleSendMessage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
      >
        Join Group
      </button> */}
        <div className="flex space-x-2">

      
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button 
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>

          
        </div>
      </>}
    </div>
  );
}