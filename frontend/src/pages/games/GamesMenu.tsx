/*
* author: Jakub Kontrík (xkontr02)
* brief: homepage and navigation for games
*/
import React from "react"
import {Link} from "react-router-dom"

function GamesMenu():JSX.Element {
  return (
    <div className={"games"}>
      <Link to={"/games/spot-finder"}><b>SPOT FINDER</b></Link>
    </div>
  )
}

export default GamesMenu