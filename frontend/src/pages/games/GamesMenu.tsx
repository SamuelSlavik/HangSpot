import React from "react"
import {Link} from "react-router-dom"

function GamesMenu():JSX.Element {
  return (
    <div className={"games"}>
      <Link to={"/games/spot-finder"}>SPOT FINDER</Link>
    </div>
  )
}

export default GamesMenu