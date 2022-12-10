import React from "react";
import {NavLink} from "react-router-dom";

// ICONS //
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {SvgIcon} from "@mui/material";

function Navigation():JSX.Element {
  return (
    <div className={"navigation"}>
      <div className={"navigation__logo"}>
        <NavLink to={"/"} ><SvgIcon component={PushPinOutlinedIcon} fontSize={"large"}/></NavLink>
      </div>
      <div className={"navigation__search"}>
        <NavLink to={"/about"} >Search</NavLink>
      </div>
      <div className={"navigation__links"}>
        <NavLink to={"/createPost"} ><SvgIcon component={AddOutlinedIcon} fontSize={"large"}/></NavLink>
        <NavLink to={"/profile"} ><SvgIcon component={PersonOutlineOutlinedIcon} fontSize={"large"}/></NavLink>
      </div>
    </div>
  )
}

export default Navigation