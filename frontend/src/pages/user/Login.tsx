import React from "react";
import {useEffect, useState, useContext} from "react";
import UserContext from "../../context/userContext";
import Axios from "axios";

import {useNavigate} from "react-router-dom"

function Login(): JSX.Element {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { userData, setUserData } = useContext(UserContext);

  const submit = async (e:any) => {
    e.preventDefault();
    try {
      const loginRes = await Axios.post(
        "http://localhost:8000/api/users/token/",
        {email, password}
      );
      if (loginRes.data) {
        navigate("/profile")
      }
      setTimeout(() => {
        setUserData({
          token: loginRes.data.access,
          id: loginRes.data.user_id,
        });
        localStorage.setItem("token", loginRes.data.access);
        localStorage.setItem("id", loginRes.data.user_id);
      }, 5000)
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = () => {
    setUserData({
      token: undefined,
      id: null,
    });
    localStorage.setItem("token", "");
    localStorage.setItem("id", "");
  }

  return (
    <div>
      <form
        className={"login"}
        autoComplete="new-password"
        onSubmit={submit}
      >
        <input
          id={"loginName"}
          className={"input"}
          type={"text"}
          name={"login-name"}
          placeholder={"Name"}
          value={email}
          onChange={(event)=>(setEmail(event.target.value))}
        />
        <input
          id={"loginPassword"}
          className={"input"}
          type={"password"}
          name={"login-password"}
          placeholder={"Password"}
          value={password}
          onChange={(event)=>(setPassword(event.target.value))}
        />
        <input
          id={"loginSubmit"}
          className={"submit"}
          name={"login-submit"}
          type={"submit"}
          value={"Log in"}
        />
      </form>
      {userData.token ? <p>logged in </p> : <>nope</>}
      <a onClick={logOut}>Log Out</a>
    </div>
  )
}

export default Login