import React from "react";
import {useEffect, useState, useContext} from "react";
import UserContext from "../../context/userContext";
import Login from "./Login";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {User} from "../../types/interfaces";
import Achievements from "./Achievements";
import Spots from "./Spots";

import profilePhoto from "../../assets/images/profile-photo.jpeg"

function Profile():JSX.Element {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState<User>()

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

    const fetchUserData = async () => {
      const res = await axios.get("http://localhost:8000/api/users/get/" + userData.id + "/")
      setUserInfo(res.data)
    }
    fetchUserData().catch(console.error)
  }, [userData]);

  return (
    <div>
      {
        userData.token === undefined ?
          <div className={"content"}><h1>LOADING</h1></div> :
          <div className={"profile"}>
            <div className={"profile__left"}>
              <div className={"profile__info"}>
                {
                  userInfo?.image ?
                    <p>Zevraj ten kokot ma image</p> :
                    <img alt={"profile image"} src={profilePhoto}/>
                }
                <h2>{userInfo?.username}</h2>
                <p>{userInfo?.email}</p>
              </div>
              <Achievements />
            </div>
            <Spots />
          </div>
      }
    </div>
  )
}

export default Profile