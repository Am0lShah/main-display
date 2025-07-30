import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy Data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    photo: "https://via.placeholder.com/50",
    posts: 25,
    reach: "10K",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    photo: "https://via.placeholder.com/50",
    posts: 18,
    reach: "8K",
  },
  {
    id: 3,
    name: "Alice Brown",
    email: "alice@example.com",
    photo: "https://via.placeholder.com/50",
    posts: 30,
    reach: "12K",
  },
];

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const followers = Object.keys(user.followers).length;
  const following = Object.keys(user.following).length;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-primary-very-light to-white min-h-screen">
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="h-32 w-32 rounded-full object-cover border-4 border-primary-medium shadow-2xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-primary-light rounded-full p-2 border-2 border-white">
            <svg className="w-4 h-4 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-primary-light">
            <h3 className="text-2xl font-bold text-primary-dark mb-2">
              Welcome back, {user.username}!
            </h3>
            <p className="text-primary-medium text-lg">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-primary-light hover:shadow-2xl transition-all transform hover:scale-105">
          <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-primary-dark mb-2">Followers</h3>
          <p className="text-4xl font-bold text-primary-medium">{followers}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-primary-light hover:shadow-2xl transition-all transform hover:scale-105">
          <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-dark" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-primary-dark mb-2">Following</h3>
          <p className="text-4xl font-bold text-primary-medium">{following}</p>
        </div>
      </div>

      {/* Friends Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-primary-light">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-primary-dark mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-primary-medium" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            Friends
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-primary-light">
              <thead className="bg-primary-very-light">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-dark uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-dark uppercase tracking-wider">Photo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-dark uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-dark uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-dark uppercase tracking-wider">Posts</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-dark uppercase tracking-wider">Reach</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-primary-light">
                {users.map((user, index) => (
                  <tr key={user.id} className={`hover:bg-primary-very-light transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-primary-very-light/30'}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-medium font-medium">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={user.photo} 
                        alt={user.name} 
                        className="h-12 w-12 rounded-full border-2 border-primary-light"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-dark">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-medium">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-medium">{user.posts}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-medium">{user.reach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;