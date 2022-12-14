/*
* author: Samuel Slávik (xslavi37)
* brief: Unlogged user profile, home for all components with user information.
*         Also displaying basic profile information
*/

import React from "react";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom"
// Global state
import UserContext from "../../context/userContext";
// Structures and modules
import {User} from "../../types/interfaces";
// Components
import Achievements from "./Achievements";
import UserSpots from "./UserSpots";
// Images
import profilePhoto from "../../assets/images/profile-photo.jpeg"

function Profile():JSX.Element {
  // State
  const [userInfo, setUserInfo] = useState<User>()
  // Global context
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate()
  const { userId } = useParams()

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get("http://localhost:8000/api/users/get/" + userId + "/")
      setUserInfo(res.data)
    }
    fetchUserData().catch(console.error)
  }, [userData]);

  // @ts-ignore
  return (
    <div>
      {
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
            </div>
            <>{/* @ts-ignore*/}</>
            <Achievements id={parseInt(userId)}/>
          </div>
          <UserSpots id={userId}/>
        </div>
      }
      <>{console.log(userInfo)}</>
    </div>
  )
}

export default Profile