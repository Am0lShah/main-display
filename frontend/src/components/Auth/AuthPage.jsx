import React, { useState } from "react";
import axios, { formToJSON } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    // avatar: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? import.meta.env.VITE_REGISTER_USER
      : import.meta.env.VITE_LOGIN_USER;

    try {
      let payload;

      if (isSignUp) {
        payload = new FormData();
        payload.append("fullName", formData.fullName);
        payload.append("username", formData.username);
        payload.append("email", formData.email);
        payload.append("password", formData.password);
        // if (formData.avatar) {
        //   payload.append("avatar", formData.avatar);
        // }
      } else {
        payload = {
          email: formData.email,
          password: formData.password,
        };
      }

      console.log(formData.avatar);
      
      const response = await axios.post(url, payload, {
        headers: {
            //  "Content-Type": isSignUp ? "multipart/form-data" : "application/json",
          "Content-Type": isSignUp ? "application/json" : "application/json",
        },
      });

      if (response.status === 200) {
        dispatch(setUser(response.data.User));
        localStorage.setItem("token", response.data.accessToken);
        alert(response.data.message || "Success!");
      }
      if(response.status===201){
        alert(response.data.message || "Success Register!");
        window.location.reload();
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert(
          `User already exists with username ${formData.username} and email ${formData.email}`
        );
      } else {
        alert(error.response?.data?.message || "Something went wrong!");
      }
      console.error("Error:", error.response?.data || error.message);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-very-light to-primary-light">
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border-2 border-primary-light">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-b from-primary-very-light to-white">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary-dark">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="mb-4">
                  <label className="block text-primary-dark font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full px-4 py-3 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-primary-dark font-medium mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="w-full px-4 py-3 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="block text-primary-dark font-medium mb-2">Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    className="w-full px-4 py-3 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div> */}
              </>
            )}
            <div className="mb-4">
              <label className="block text-primary-dark font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-primary-dark font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 border-2 border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-primary-medium transition-all"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-medium hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p className="text-center mt-6 text-primary-medium">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              className="text-primary-dark hover:text-primary-dark-hover cursor-pointer font-semibold underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-medium/20 to-primary-dark/20"></div>
        <img
          src="image4.png"
          alt="Auth Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);
};

export default AuthPage;
