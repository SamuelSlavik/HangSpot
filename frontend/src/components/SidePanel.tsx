import React, {useState, useEffect, useContext} from "react";
import {NavLink, Link} from "react-router-dom";

import css from "*.scss";

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import {SvgIcon} from "@mui/material";

import {toggleSidePanelOff} from "../functions/toggleSidePanel";


function SidePanel(): JSX.Element {
  //const [allTags, setAllTags] = useState<Tags[]>([])
  //const [searchTags, setSearchTags] = useState<Tags[]>([])

  const tagCheckboxHandler = (event: InputEvent) => {

  }

  return (
    <div className={"sidepanel"} id={"sidePanel"}>
      <div className={"sidepanel__content"}>
        <div>
          <h2>Filter by tags:</h2>
          {/*
            allTags.map(({id, name}) => (

              <div key={id}>
                <input
                  type={"checkbox"}
                  id={"tag" + id}
                  className={"sidepanel__checkbox"}
                  checked={(searchTags.some(((i:number) => i ==id)))}
                  onChange={event => {
                    if (event.target.checked) {
                      setSearchTags((searchTags:[]) => [...searchTags, id])
                    } else {
                      setSearchTags(searchTags.filter((item:number) => item !== id))
                    }
                  }}
                />
                <label
                  className={"sidepanel__checkbox-label"}
                  htmlFor={"tag" + id}
                >
                  {name}
                </label>
              </div>
            ))
          */}
        </div>
        <div className={"sidepanel__off"}>
          <a onClick={toggleSidePanelOff}>
            <SvgIcon component={ArrowForwardOutlinedIcon} fontSize={"large"}/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SidePanel