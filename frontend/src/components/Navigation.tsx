/*
* author: Samuel Slávik (xslavi37)
* brief: navigation displayed on the top of the web
 */

import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
// ICONS //
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {SvgIcon} from "@mui/material";
// Global context
import UserContext from "../context/userContext";

function Navigation():JSX.Element {
  const { userData } = useContext(UserContext)

  return (
    <div className={"navigation"}>
      <div className={"navigation__logo"}>
        <NavLink to={"/"} ><SvgIcon component={PushPinOutlinedIcon} fontSize={"large"}/></NavLink>
      </div>
      <div className={"navigation__links"}>
        {userData.token ? <NavLink to={"/create"} ><SvgIcon component={AddOutlinedIcon} fontSize={"large"}/></NavLink> : <></>}
        <NavLink to={userData.token ? "/profile" : "/login"} ><SvgIcon component={PersonOutlineOutlinedIcon} fontSize={"large"}/></NavLink>
      </div>
    </div>
  )
}

export default Navigation