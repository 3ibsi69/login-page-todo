import axios from "axios";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getLogin = () => {
    axios.get("http://localhost:3636/signup").then((res) => {
    const data=res.data;
    const finduser=data.find((e)=>e.email===email&&e.password===password);
    if(finduser){
        alert("Hello"+finduser.name);

  }else{
    alert("Please enter a valid email or password");
  }
    });

  };

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
        You don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
