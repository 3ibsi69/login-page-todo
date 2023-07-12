    import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function AdminForm(){
    var navigate = useNavigate();
    var [user, setUser] = useState({
        _id: "",
        email: "",
        });
    

    useEffect(() => {
        if (localStorage.getItem("token")) {
          axios
            .post("http://localhost:3636/user/verify", {
              token: localStorage.getItem("token"),
            })
            .then(({ data }) => {
              if (data.user._id) {
                setUser(data.user);
                console.log(data.user);
              } else {
                navigate("/");
              }
            });
        } else {
          navigate("/");
        }
      }, []);
      return(
            <div>
                <h1>Admin</h1>
            </div>
        );


}


export default AdminForm;