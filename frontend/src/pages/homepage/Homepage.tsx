import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import {toggleSidePanelOn} from "../../functions/toggleSidePanel";

// ICONS //
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import {SvgIcon} from "@mui/material";

//components
import SidePanel from "../../components/SidePanel";
import Map from "../../components/maps/Map";

function Homepage():JSX.Element {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA71RHhLabJaCTd4oYQwZGAcF2Luxcnf5s",
  });

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
        <Link to={"/games"}>
          <SvgIcon component={SportsEsportsOutlinedIcon} fontSize={"large"}/>
        </Link>
      </div>
    </div>
  )
}

export default Homepage