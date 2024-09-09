import { StrictMode } from 'react'
import * as ReactDom from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Camera1 from './pages/Camera1.jsx'
import Camera2 from './pages/Camera2.jsx'
import Camera3 from './pages/Camera3.jsx'


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children:[
       {
        path: "/Camera1",
        element: <Camera1/>
       },
       {
        path: "/Camera2",
        element: <Camera2/>
       },
       {
        path: "/Camera3",
        element: <Camera3/>
       }
      ]
    },
  ]
)
ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
