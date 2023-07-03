import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var navigate=useNavigate();

  const getLogin = () => {
    axios.get("http://localhost:3636/signup").then((res) => {
      const data = res.data;
      const finduser = data.find(
        (e) => e.email === email && e.password === password
      );
      if (finduser) {
        alert("Hello " + finduser.name);
      } else {
        alert("Please enter a valid email or password");
      }
    });
  };
  function tosignup(){
    navigate("/signup");
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <div className="inputs">
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="btn" onClick={getLogin}>
          Login
        </button>
      </div>
      <hr />
      <p>
        You don't have an account? <span onClick={()=>{tosignup();}}> Sign Up</span>
      </p>
    </div>
  );
}

export default Login;
