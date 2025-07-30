import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-very-light to-primary-light">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary-dark mb-6">
            Digital Notice Board
          </h1>
          <p className="text-xl text-primary-medium mb-8 max-w-3xl mx-auto">
            Modern IoT-powered digital signage solution for institutions and organizations. 
            Upload notices, images, and videos remotely via mobile app.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/auth" 
              className="bg-primary-medium hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-primary-medium text-primary-dark hover:bg-primary-medium hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl mb-13 p-8 shadow-xl border-2 border-primary-light">
          <h2 className="text-2xl font-bold text-primary-dark mb-6 text-center">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/dashboard" 
              className="bg-primary-very-light hover:bg-primary-light p-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 border-2 border-primary-light"
            >
              <div className="text-primary-dark font-semibold">Dashboard</div>
            </Link>
            <Link 
              to="/device" 
              className="bg-primary-very-light hover:bg-primary-light p-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 border-2 border-primary-light"
            >
              <div className="text-primary-dark font-semibold">Manage Devices</div>
            </Link>
            <Link 
              to="/group" 
              className="bg-primary-very-light hover:bg-primary-light p-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 border-2 border-primary-light"
            >
              <div className="text-primary-dark font-semibold">Group Management</div>
            </Link>
            <Link 
              to="/chat" 
              className="bg-primary-very-light hover:bg-primary-light p-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 border-2 border-primary-light"
            >
              <div className="text-primary-dark font-semibold">Send Notices</div>
            </Link>
          </div>
        </div>


        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-primary-light hover:shadow-2xl transition-all duration-300">
            <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-4 text-center">Mobile App</h3>
            <p className="text-primary-medium text-center">
              Upload notices, images, and videos from your mobile device with our cross-platform React Native app.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-primary-light hover:shadow-2xl transition-all duration-300">
            <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-4 text-center">Raspberry Pi Display</h3>
            <p className="text-primary-medium text-center">
              Low-cost Raspberry Pi hardware with HDMI display support for reliable digital signage.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-primary-light hover:shadow-2xl transition-all duration-300">
            <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-4 text-center">Real-time Updates</h3>
            <p className="text-primary-medium text-center">
              Instant content delivery with WebSocket support and cloud-based storage for seamless updates.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Home;
