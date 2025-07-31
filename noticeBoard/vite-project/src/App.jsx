import { useState, useRef, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Advertisement from './components/Advertisement.jsx';
import ImportantNotice from './components/ImportantNotice.jsx';
import VideoImageSection from './components/VideoImageSection.jsx';
import RegularAnnouncement from './components/RegularAnnouncement.jsx';
import { io } from 'socket.io-client';
import axios from "axios"

let socket;

function App() {

  const [RegularNotice, setRegularNotice]=useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });


  const [textNotice, setTextNotice ]=useState([]);
  const [imageNotice, setImageNotice]=useState([]);
  const [realTimeNotic, setRealTimeNotice]=useState([]);
  const buttonRef = useRef(null);


  

  const fetchTextNotice= async(name)=>{
    const res= await axios.get(`https://kiosk-backend-14wu.onrender.com/api/v1/admin/devices/notices/${name}`)

    //console.log(res);
    setTextNotice(res.data.messages);
    setRegularNotice(true);
  }


  

  const fetchImageNotice= async(name)=>{
    const res= await axios.get(`https://kiosk-backend-14wu.onrender.com/api/v1/admin/devices/notices-image-video/${name}`)

    //console.log(res);
    setImageNotice(res.data.messages);
  }





  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Join socket AFTER form is submitted
  const connectSocket = (name) => {
    socket = io('https://kiosk-backend-14wu.onrender.com', {
      auth: { name, groupName: 'xxxx' },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 3,
      withCredentials: true,
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected!');
    });

    socket.on('receive_message', (newMessage) => {
      // console.log('Received message:', newMessage);
      // setRealTimeNotice(...pre+newMessage);
      setRealTimeNotice((prev) => [...prev, newMessage]);
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    console.log('Form Submitted:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);


    fetchTextNotice(name);
    fetchImageNotice(name);
    // Connect to socket after form submit
    connectSocket(name);
  };

  // Auto-click submit button after 2 seconds
  useState(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);




  // Latest news fetch

  const [scrollPosition, setScrollPosition] = useState(0);
    
    const noticeText = "Impeachment motion for Justice Yashwant Verma to be raised in Lok Sabha: Kiren Rijiju";
    
    const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      if (container) {
        container.scrollLeft += 1;
        scrollAmount += 1;

        // Reset to start if reached end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          container.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
    }, 20); // adjust speed here

    return () => clearInterval(scrollInterval); // cleanup
  }, []);



  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 hidden">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your full name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a secure password"
            />
          </div>

          <button
            ref={buttonRef}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>

      {/* Notice board layout below */}
      <div className="w-screen h-screen flex flex-col bg-gray-100 overflow-hidden">
        {/* Important Notice Section - Red Banner */}
        <div className="bg-red-600 text-white flex justify-center items-center h-[10vh] min-h-[60px]">
          {/* <ImportantNotice /> */}
          {/* {
            <h1>{realTimeNotic.content}</h1>
          } */}

           <div
      ref={scrollRef}
      className="overflow-x-auto whitespace-nowrap p-4 scrollbar-hide"
    >
      {realTimeNotic.map((item, index) => (
        <div
          key={index}
          className="inline-block text-2xl text-black px-4 py-2 mr-3 rounded-lg min-w-[120px] text-center"
        >
          {item.content}
        </div>
      ))}
    </div>

          

        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 w-full flex-col md:flex-row">
          {/* Video/Image Section */}
          <div className="md:w-2/3 w-full bg-cyan-200 flex justify-center items-center h-[45vh] md:h-full">
            <VideoImageSection data={imageNotice}  />
          </div>

          {/* Regular Announcement Section */}
          <div className="md:w-1/3 w-full bg-green-600 text-white flex justify-center items-center h-[45vh] md:h-full">

          {RegularNotice&&
            <RegularAnnouncement data={textNotice} />
          
          }
          
          </div>
        </div>

        {/* Advertisement Section */}
        <div className="bg-black text-white flex justify-center items-center h-[10vh] min-h-[60px]">
          <Advertisement />
        </div>
      </div>
    </>
  );
}

export default App;
