import React, {useState, useEffect, useContext, useRef} from "react";
import {NavLink, Link} from "react-router-dom";

import SearchContext from "../context/searchContext";

import css from "*.scss";

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import {SvgIcon} from "@mui/material";

import {toggleSidePanelOff} from "../functions/toggleSidePanel";
import axios from "axios";
import {Type} from "../types/interfaces";


function SidePanel(): JSX.Element {
  const {searchType, setSearchType} = useContext(SearchContext)

  const [allTypes, setAllTypes] = useState<Type[]>([])//const [searchType, setSearchType] = useState<string>("")

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/spots/types/")
        setAllTypes(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchTypes().catch(console.error)
  }, [])

  const tagCheckboxHandler = (event: InputEvent) => {

  }

  return (
    <div className={"sidepanel"} id={"sidePanel"}>
      <div className={"sidepanel__content"}>
        <div>
          <h2>Filter by category:</h2>
          <div key={"all"}>
            <input
              name={"category"}
              value={"all"}
              type={"radio"}
              id={"tag" + "all"}
              className={"sidepanel__radio"}
              checked={searchType === "all"}
              onChange={event => {
                if (event.target.checked) {
                  setSearchType(event.target.value)
                }
              }}
            />
            <label
              className={"sidepanel__checkbox-label"}
              htmlFor={"tag" + "all"}
            >
              {"all"}
            </label>
          </div>
          {
            !allTypes.length ?
              <></> :
              allTypes.map(({type_name, display_name}) => (
              <div key={type_name}>
                <input
                  name={"category"}
                  value={type_name}
                  type={"radio"}
                  id={"tag" + type_name}
                  className={"sidepanel__radio"}
                  checked={searchType === type_name}
                  onChange={event => {
                    if (event.target.checked) {
                      setSearchType(event.target.value)
                    }
                  }}
                />
                <label
                  className={"sidepanel__checkbox-label"}
                  htmlFor={"tag" + type_name}
                >
                  {type_name}
                </label>
              </div>
            ))
          }
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

// skate, walk, bmx, picnic, sunset
export default SidePanel