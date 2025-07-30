import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import ProtectedRoute from "./protectedRoute.jsx";


import AuthPage from "./components/Auth/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import Groups from "./components/component/GroupList.jsx";
import Devices from "./components/component/DeviceList.jsx";
import Chat from "./pages/Chat.jsx"
//import NoticePage from "./pages/NoticePage.jsx";
import ImageNotice from './pages/ImageNoticeUpload.jsx'
import Home from "./pages/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />

      
      <Route path="/auth" element={<AuthPage />} />

      <Route path="/about" element={<About />} />
      <Route path="/device" element={<Devices />} />



      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/imageNotice"
        element={
          <ProtectedRoute>
            <ImageNotice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/group"
        element={
          <ProtectedRoute>
            <Groups />
          </ProtectedRoute>
        }
      />


    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <>
      <RouterProvider router={router} />
    </>
  </Provider>
);
