import React from "react";
import {useEffect, useState, useContext} from "react";
import UserContext from "../../context/userContext";
import Axios from "axios";
import Login from "./Login";

function Profile():JSX.Element {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div className={"content"}>
      {
        userData.token === undefined ?
          <Login /> :
          <div>profile</div>
      }
    </div>
  )
}

export default Profile