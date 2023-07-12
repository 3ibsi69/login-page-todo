import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "..//Styles/popup.css";

function TodoForm() {
  var navigate = useNavigate();
  var [newtodo, setNewTodo] = useState("");
  var [todos, setTodos] = useState([]);
  var [user, setUser] = useState({
    _id: "",
    email: "",
  });

  //   get todos
  function getmytodos(userId) {
    axios.get("http://localhost:3636/todo/" + userId).then(({ data }) => {
      setTodos(data);
    });
  }

  // add todo
  function addTodo() {
    if (newtodo !== "") {
      axios
        .post("http://localhost:3636/todo/", {
          title: newtodo,
          userId: user._id,
        })
        .then(({ data }) => {
          getmytodos(user._id);
          setNewTodo("");
        });
    } else {
      alert("please enter your todo");
    }
  }

  // delete todo
  function deleteTodo(todoId) {
    axios
      .delete("http://localhost:3636/todo/" + todoId)
      .then(({ data }) => {
        const updatedTodos = todos.filter((todo) => todo._id !== todoId);
        setTodos(updatedTodos);
        getmytodos(user._id);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  }

  // edit todo
  const edittodo = (todoId) => {
    const editedTodo = prompt("Enter your new todo");
    if (editedTodo === "") {
      alert("Please enter a todo");
      return;
    }else{
    axios
      .put("http://localhost:3636/todo/" + todoId, { title: editedTodo })
      .then(({ data }) => {
        const editedTodo = data;
        const editedTodos = todos.map((todo) => {
          if (todo._id === editedTodo._id) {
            return editedTodo;
          }
          return todo;
        });
        setTodos(editedTodos);
        getmytodos(user._id);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };}

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.user._id) {
            setUser(data.user);
            getmytodos(data.user._id);
          } else {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  }, []);

  var [showPopup, setShowPopup] = useState(false);
  var [showPopupDel, setShowPopupDel] = useState(false);
  var [deleteTodoId, setDeleteTodoId] = useState(null);

  function show_pop() {
    setShowPopup(!showPopup);
  }

  // disconnect
  function disconnect() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="todo-form">
      <div className={`container-todo ${showPopup ? "blur" : ""}`}>
        <h1 align="center">
          welcome <br />
          <span id="titlew">{user.email}</span>{" "}
        </h1>
        <div className="inputs">
          <input
            className="input"
            type="text"
            placeholder="Enter your todo.... "
            value={newtodo}
            onChange={(e) => setNewTodo(e.target.value)}
            required
          />
          <button id="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>
        <hr />
        <button id="btn-dis" onClick={show_pop}>
          Disconnect
        </button>
        <div className="todos">
          <div className="todo">
            {todos.map((e) => {
              return (
                <div className="todo-item" key={e._id}>
                  <p>{e.title}</p>
                  <svg
                    onClick={() => edittodo(e._id)}
                    id="edit"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                                        <path
                      fill="currentColor"
                      d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Zm-3.525-.725l-.7-.7l1.4 1.4l-.7-.7Z"
                    />

                  </svg>

                  <Popup
                    trigger={
                      <svg
                        id="del"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 256 256"
                      >
                                              <path
                          fill="currentColor"
                          d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24ZM100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Zm48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Z"
                        />

                      </svg>
                    }
                    position="right center"
                    open={showPopupDel && deleteTodoId === e._id}
                    onClose={() => setShowPopupDel(false)}
                    onOpen={() => {
                      setDeleteTodoId(e._id);
                      setShowPopupDel(true);
                    }}
                  >
                    <div className="del-popup">
                      <div className="del-popup-inner">
                        <h1>Are you sure to delete?</h1>
                        <div className="btns">
                          <button onClick={() => deleteTodo(e._id)}>yes</button>
                          <button onClick={() => setShowPopupDel(false)}>no</button>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showPopup ? (
        <div className="popup">
          <div className="popup-inner">
            <h1>Are you sure you want to disconnect?</h1>
            <div className="btns">
              <button onClick={() => disconnect()}>yes</button>
              <button onClick={() => show_pop()}>no</button>
            </div>
          </div>
        </div>
      ) : null}
    {user.role==="admin" ? (
        <div className="admin">
            <button id="btn-admin" onClick={() => navigate("/admin")}>
                Admin section
            </button>
                </div>
    ) : null}


    </div>
  );
}

export default TodoForm;
