import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import Gallery from './pages/Gallery.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { AuthLayout } from './components/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: (
              
              <Home/>
              
              ),
        },
        {
            path: "/login",
            element: (
              <Login/>
            ),
        },
        {
            path: "/signup",
            element: (
              <SignUp/>
            ),
        },
      {
        path: "/admin-dashboard",

        element: (
        <AuthLayout route='/admin-dashboard'>
        <Admin/>
        </AuthLayout>
        ),
    },
    {
      path: "/gallery",
      
      element: (
        <AuthLayout route='/gallery'>
        <Gallery />
        </AuthLayout>
        ),
  },

    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
