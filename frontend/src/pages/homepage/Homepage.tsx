/*
* author: Samuel Slávik (xslavi37)
* brief: homepage
*/

import React, {useContext} from 'react';
import {Link} from "react-router-dom";
// functions
import {toggleSidePanelOn} from "../../functions/toggleSidePanel";
// ICONS //
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import {SvgIcon} from "@mui/material";
// components
import SidePanel from "../../components/SidePanel";
import Map from "../../components/maps/Map";
// global context
import mapContext from "../../context/mapContext";

function Homepage():JSX.Element {
  // global context
  const {isLoaded} = useContext(mapContext)

  return (
    <div className={"homepage"}>
      <SidePanel />
      <div className={"map-wrapper"}>
        {(!isLoaded) ? <div>Loading...</div> : <Map />}
      </div>
      <div id={""} className={"filter-link"}>
        <a onClick={toggleSidePanelOn}>
          <SvgIcon component={TuneOutlinedIcon} fontSize={"large"}/>
        </a>
      </div>
      <div id={""} className={"games-link"}>
        <Link to={"/games/spot-finder"}>
          <SvgIcon component={SportsEsportsOutlinedIcon} fontSize={"large"}/>
        </Link>
      </div>
    </div>
  )
}

export default Homepage