import React from "react";

// components
import Login from "./Components/Login.jsx";
import SignUp from "./Components/SignUp.jsx";
import TodoForm from "./Components/todo.jsx";

// styling
import "./Styles/Signup.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminForm from "./Components/Admin.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/todo" element={<TodoForm/>} />
            <Route path="/admin" element={<AdminForm/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
