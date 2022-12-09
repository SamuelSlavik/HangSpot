import React from 'react';

import {Link} from "react-router-dom";

import {toggleSidePanelOn} from "../../functions/toggleSidePanel";

// ICONS //
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import {SvgIcon} from "@mui/material";

//components
import SidePanel from "../../components/SidePanel";

function Homepage():JSX.Element {
  return (
    <div className={"homepage"}>
      <SidePanel />

      <div className={"map-wrapper"}>
        here will be map
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