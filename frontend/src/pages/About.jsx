import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-very-light to-primary-light">
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary-light">
          <h1 className="text-4xl font-bold text-primary-dark mb-8 text-center">About Digital Notice Board</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary-dark mb-4">System Overview</h2>
              <p className="text-primary-medium mb-4">
                The Digital Notice Board with IoT Updates is a modern solution designed to streamline how 
                information—such as notices, images, and videos—is displayed in institutions and organizations.
              </p>
              <p className="text-primary-medium">
                Leveraging Raspberry Pi, React Native, robust backend services, and cloud storage, the system 
                allows users to upload announcements via a mobile app, which are then immediately showcased 
                on digital signage screens.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-primary-dark mb-4">Key Features</h2>
              <ul className="space-y-2 text-primary-medium">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-medium rounded-full mr-3"></div>
                  Remote content upload via mobile app
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-medium rounded-full mr-3"></div>
                  Real-time updates with WebSocket support
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-medium rounded-full mr-3"></div>
                  Secure authentication and content management
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-medium rounded-full mr-3"></div>
                  Cloud-based storage with Supabase
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-medium rounded-full mr-3"></div>
                  Scalable architecture for multiple locations
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary-very-light rounded-xl p-6 border-2 border-primary-light">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">Tech Stack</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-bold text-primary-dark mb-2">Frontend</h3>
                <p className="text-primary-medium">React Native (Mobile App)</p>
                <p className="text-primary-medium">React.js (Web Interface)</p>
              </div>
              <div>
                <h3 className="font-bold text-primary-dark mb-2">Backend</h3>
                <p className="text-primary-medium">Node.js + Express.js</p>
                <p className="text-primary-medium">Python + Flask (Raspberry Pi)</p>
              </div>
              <div>
                <h3 className="font-bold text-primary-dark mb-2">Infrastructure</h3>
                <p className="text-primary-medium">MongoDB Atlas</p>
                <p className="text-primary-medium">Supabase Storage</p>
                <p className="text-primary-medium">Raspberry Pi 4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
