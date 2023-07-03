import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var navigate=useNavigate();


  const addSignup = () => {
    if (name === "") {
      alert("Please enter your name");
      return;
    }
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    if (!email.includes("@") || email.lastIndexOf(".") <= email.indexOf("@")) {
      alert("Please enter a valid email");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    }

    axios
      .post("http://localhost:3636/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        const createdName = res.data.name;
        const createdEmail = res.data.email;
        const createdPassword = res.data.password;
        setName(createdName);
        setEmail(createdEmail);
        setPassword(createdPassword);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
      navigate("/");
  };
  function tologin(){
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
            <button id="btn" onClick={addSignup}>
              Sign Up
            </button>
        ) : (
          <button id="btn" onClick={addSignup}>
            Sign Up
          </button>
        )}
      </div>
      <hr />
      <p>
        You already have an account? <span onClick={()=>{tologin();}}>Login</span>
      </p>
    </div>
  );
}

export default Signup;
