/*
* author: Jakub Kontrík (xkontr00)
* brief: Sidepanel with all categories of spots that handles api calls to get filtered spots
 */

import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
// Structures and modules
import css from "*.scss";
import {Type} from "../types/interfaces";
// Global context
import SearchContext from "../context/searchContext";
// Icons
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import {SvgIcon} from "@mui/material";
// Functions
import {toggleSidePanelOff} from "../functions/toggleSidePanel";

// Function START ///////////////////////////////////////////////////////
function SidePanel(): JSX.Element {
  // State
  const [allTypes, setAllTypes] = useState<Type[]>([])
  const [error, setError] = useState<any>()

  // Global context
  const {searchType, setSearchType} = useContext(SearchContext)

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/spots/types/")
        setAllTypes(response.data)
      } catch (e:any) {
        console.log(e)
        e.response.data.detail && setError(e.response.data.detail)
      }
    }
    fetchTypes().catch(console.error)
  }, [])

  return (
    <div className={"sidepanel"} id={"sidePanel"}>
      <div className={"sidepanel__content"}>
        <div>
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
            error ?
              <div className={"error-message__wrapper"}>
                {error}
              </div> : <></>
          }
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

export default SidePanel