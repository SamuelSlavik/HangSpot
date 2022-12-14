import React from "react";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
// Global state
import UserContext from "../../context/userContext";
// Structures and modules
import {User} from "../../types/interfaces";
// Components
import Achievements from "./Achievements";
import Spots from "./Spots";
// Images
import profilePhoto from "../../assets/images/profile-photo.jpeg"


function Profile():JSX.Element {
  // State
  const [userInfo, setUserInfo] = useState<User>()
  // Global context
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate()

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

  const logOut = async () => {
    setUserData({
      token: undefined,
      id: null,
    });
    localStorage.setItem("token", "");
    localStorage.setItem("id", "");
    navigate("/")
  }

  return (
    <div>
      {
        userData.token === undefined ?
          <div className={"content profile-loggedOut"}><h1>You have to log in first</h1></div> :
          <div className={"profile"}>
            <div className={"profile__left"}>
              <div className={"profile__info"}>
                {
                  userInfo?.image ?
                    <img src={userInfo.image} alt="Profile image"/> :
                    <img alt={"Profile Image"} src={profilePhoto}/>
                }
                <h2>{userInfo?.username}</h2>
                <p>{userInfo?.email}</p>
                <a onClick={logOut}>Log Out</a>
              </div>
              <Achievements />
            </div>
            <Spots />
          </div>
      }
      <>{console.log(userInfo)}</>
    </div>
  )
}

export default Profile