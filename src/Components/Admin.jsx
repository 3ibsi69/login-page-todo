import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/adminStyle.css";

function AdminForm() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [noTodos, setNoTodos] = useState(false);
  const [AdminId, setAdminId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.user.role !== "admin") {
            navigate("/");
          } else {
            getAllUsers(data.user._id);
          }
        })
        .catch((error) => {
          console.error("Error verifying user:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [allUsers]);

  // Get all users
  const getAllUsers = async (adminId) => {
    await axios
      .get("http://localhost:3636/admin/getalluser/" + adminId)
      .then(({ data }) => {
        const filteredUsers = data.alluser.filter((user) => user._id !== adminId);
        setAllUsers(filteredUsers);
        setAdminId(adminId);
      })
      .catch((error) => {
        console.error("Error getting all users:", error);
      });
  };

  const changeRole = (userId, newRole) => {
    axios
      .put("http://localhost:3636/admin/changeRole/" + AdminId, {
        id: userId,
        role: newRole,
      })
      .then(() => {
        getAllUsers(AdminId);
      })
      .catch((error) => {
        console.log("error changing role ");
      });
  };

  const deleteUser = (userId) => {
    axios
      .delete("http://localhost:3636/admin/deleteUser/" + AdminId, {
        data: { id: userId },
      })
      .then(() => {
        getAllUsers(AdminId);
      })
      .catch((error) => {
        console.log("error deleting user ");
      });
  };

  const seetodos = (userId) => {
    // Check if todos are already being displayed for the user
    if (selectedUserId === userId) {
      setTodos([]);
      setSelectedUserId(null);
    } else {
      // Fetch todos for the user
      axios
        .get("http://localhost:3636/todo/" + userId)
        .then(({ data }) => {
          if (data.length === 0) {
            setNoTodos(true);
          } else {
            setTodos(data);
            setNoTodos(false);
          }
          setSelectedUserId(userId);
        })
        .catch((error) => {
          console.log("Error fetching todos:", error);
        });
    }
  };

  return (
    <div className="Users-list">
      <div className="disconnect">
        <button className="btn" onClick={() => navigate("/todo")}>
          Go Back
        </button>
      </div>
      <h1>All Users:</h1>
      <div className="List">
        {allUsers.map((e, index) => {
          const counter = index + 1;
          return (
            <div className="users" key={e._id}>
              <h3>User {counter}</h3>
              <h4>Id</h4>
              <p>{e._id}</p>
              <h4>email</h4>
              <p>{e.email}</p>
              <h4>role</h4>
              <p>{e.role}</p>
              <div className="admin-action">
                <button className="btn" onClick={() => changeRole(e._id, "user")}>
                  change to user
                </button>
                <button className="btn" onClick={() => changeRole(e._id, "admin")}>
                  change to admin
                </button>
                <button className="btn" onClick={() => deleteUser(e._id)}>
                  delete user
                </button>
                <button className="btn" onClick={() => seetodos(e._id)}>
                  {selectedUserId === e._id ? "hide todos" : "see todos"}
                </button>
              </div>

              {selectedUserId === e._id && (
                <div>
                  <h4>Todos:</h4>
                  {noTodos ? (
                    <p>no todos</p>
                  ) : (
                    <ul>
                      {todos.map((todo) => (
                        <li key={todo.id}> {todo.title}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminForm;
