import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminForm() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [todos,setTodos]=useState([]);
  const [AdminId,setAdminId]=useState(null);
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
        // const filteredUsers = data.alluser.filter(user=>user._id!==adminId);
        setAllUsers(data.alluser);
        setAdminId(adminId)
      })
      .catch((error) => {
        console.error("Error getting all users:", error);
      });
  };


  const changeRole = (userId,newRole)=>{
  axios
  .put("http://localhost:3636/admin/changeRole/" + AdminId, {
    id:userId,
    role: newRole,
  })
  .then(()=>{
    getAllUsers(AdminId);

  })
  .catch((error)=>{
    console.log("error changing role ")
  })
}
const deleteUser = (userId)=>{
  axios
  .delete("http://localhost:3636/admin/deleteUser/" + AdminId, {
    data:{id:userId}
    })
    .then(()=>{
      getAllUsers(AdminId);
      
      }
      )
      .catch((error)=>{
        console.log("error deleting user ")
        })
        }
          




  return(
    <div className="Users-list">

    <h1>All Users :</h1>
     <div className="List">
      {allUsers.map((e,index)=>{
          const counter=index+1;
        return(
        <div className="users" key={e._id}>
          <h3>User {counter}</h3>
          <h4>Id</h4>
          <p>{e._id}</p>
          <h4>email</h4>

          <p>{e.email}</p>
          <h4>role</h4>

          <p>{e.role}</p>
          <div className="admin-action">
          <button onClick={()=>changeRole(e._id,"user")}>change to user</button>
          <button onClick={()=>changeRole(e._id,"admin")}>change to admin</button>
          <button onClick={()=>deleteUser(e._id)}>delete user</button>



          </div>
          
          </div>
    )
      })}
      </div> 
    </div>

  )

}



export default AdminForm;