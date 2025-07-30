import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import LoginForm from './Pages/login.jsx';
import store from './redux/store.js'



const router=createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<App />} />
      <Route path="/login" element={<LoginForm />} />

</Route>
    )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}><>
    <RouterProvider router={router} />
    </>
  </Provider>,
)
