/*
* author: Samuel Slávik (xslavi37)
* brief: Form and logic for logging user
*/

import React from "react";
import {useState, useContext} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom"
// global context
import UserContext from "../../context/userContext";

function Login(): JSX.Element {
  //state
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<any>();
  // global context
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate()

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
      setUserData({
        token: loginRes.data.access,
        id: loginRes.data.user_id,
      });
      localStorage.setItem("token", loginRes.data.access);
      localStorage.setItem("id", loginRes.data.user_id);
    } catch (e:any) {
      console.log(e);
      e.response.data.detail && setError(e.response.data.detail);
    }
  };

  return (
    <div className={"content "}>
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
      <div className={"error-message__wrapper"}>
        {
          error ? <p>{error}</p> : <></>
        }
      </div>
    </div>
  )
}

export default Login