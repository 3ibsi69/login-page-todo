import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var navigate = useNavigate();

function login(){
  axios.post("http://localhost:3636/user/login",{email,password}).then(({data})=>{
    if(data.token){
      localStorage.setItem("token",data.token);
      navigate("/todo");
    }else{
      alert(data.msg);
    }
  })
}


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
        <button id="btn" onClick={()=>login()}>
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
