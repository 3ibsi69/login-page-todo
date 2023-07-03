import React from "react";
import ReactDOM from "react-dom/client";
import SignUp from "./Components/SignUp.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import "./Styles/Signup.css";
import TodoForm from "./Components/todo.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path:"/todo/:signupid",
    element: <TodoForm/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
