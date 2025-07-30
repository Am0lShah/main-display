import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/navbar/SideBar";
import { useSelector } from "react-redux";

function Layout() {
  const user = useSelector((state) => state.auth.user);
  // const user =true;
 return (
  <div className="flex flex-col md:flex-row">
    {/* {user && (
      <div className="hidden md:block md:w-1/4 lg:w-1/5">
        <Sidebar />
      </div>
    )} */}

    <div className="flex-1 w-full">

      {user&&
      <Header />
      
      }
      <div className="mt-0 p-3 md:p-4">
        <Outlet /> {/* This will render pages dynamically */}
      </div>
    </div>
  </div>
);
}

export default Layout;
