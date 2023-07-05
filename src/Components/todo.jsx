import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TodoForm() {
  var navigate = useNavigate();
  var [newtodo, setNewTodo] = useState("");
  var [todos, setTodos] = useState([]);

  var [user, setUser] = useState({
    _id: "",
    email: "",
  });

  function getmytodos(userId) {
    axios.get("http://localhost:3636/todo/" + user._id).then(({ data }) => {
      setTodos(data);
    });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.user._id) {
            setUser(data.user);
            getmytodos(data._id);
          } else {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  }, []);

  function addTodo() {
    axios
      .post("http://localhost:3636/todo/", { title: newtodo, userId: user._id })
      .then(({ data }) => {
        getmytodos(user._id);
      });
  }

  function deleteTodo() {
    axios.delete("http://localhost:3636/todo/" + user._id).then(({ data }) => {
      getmytodos(user._id);
    });
  }
  function updateTodo() {
    axios.put("http://localhost:3636/todo/" + user._id).then(({ data }) => {
      getmytodos(user._id);
    });
  }

  function disconnect() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="todo-form">
      <div className="container-todo">
        <h1>welcome {user.email} </h1>
        <div className="inputs">
          <input
            className="input"
            type="text"
            placeholder="Enter your todo.... "
            value={newtodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button id="add-btn" onClick={() => addTodo()}>
            Add
          </button>
        </div>
        <hr />

        <div className="todos">
          <div className="todo">
            {todos.map((e) => {
              return <li>{e.title}</li>;
            })}
          </div>
        </div>
      </div>
      <button id="disconnect" onClick={() => disconnect()}>
        Disconnect
      </button>
    </div>
  );
}

export default TodoForm;
