import React from "react";
import {useEffect, useState, useContext} from "react";
import UserContext from "../../context/userContext";
import Axios from "axios";
import Login from "./Login";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function Profile():JSX.Element {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", " ");
        token = " ";
      }
      const tokenRes = await axios.get(
        "http://localhost:8000/api/users/token/check/",
        { headers: { "Authorization": "Bearer " + token } }
      );
      if (!tokenRes.data) {
        navigate("/login")
      }
    };
    checkLoggedIn().catch(console.error);
  }, []);

  return (
    <div className={"content"}>
      {
        userData.token === undefined ?
          <div className={"content a"}><h1>LOADING</h1></div> :
          <div>profile</div>
      }
    </div>
  )
}

export default Profile