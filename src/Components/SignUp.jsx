import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  var navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function singUp() {
    axios
      .post("http://localhost:3636/user/signup", { email, name, password })
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/todo");
        } else {
          alert(data.msg);
        }
      });
  }

  function tologin() {
    navigate("/");
  }

  const isFormValid = name !== "" && email !== "" && password !== "";

  return (
    <div className="container">
      <h1>SignUp</h1>
      <div className="inputs">
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        {isFormValid ? (
          <button id="btn" onClick={() => singUp()}>
            Sign Up
          </button>
        ) : (
          <button id="btn">Sign Up</button>
        )}
      </div>
      <hr />
      <p>
        You already have an account?{" "}
        <span
          onClick={() => {
            tologin();
          }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
