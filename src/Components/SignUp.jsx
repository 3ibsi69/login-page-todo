import {useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addSignup = () => {
    if (name === ""){
        alert("Please enter your name");
        return;
    }
    if (email === ""){
        alert("Please enter your email");
        return;
    }
    if(!email.includes("@") || email.lastIndexOf(".")<= email.indexOf("@") ){
        alert("Please enter a valid email");
        return;
    }

    if (password === ""){
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
  };

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
        <button id="btn" onClick={addSignup}>
          Sign Up
        </button>
      </div>
      <hr />
      <p>
        You already have an account? <a href="">Login</a>
      </p>
    </div>
  );
}

export default Signup;
