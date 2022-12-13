import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {Achievement} from "../../types/interfaces";

import StarIcon from '@mui/icons-material/Star';
import {SvgIcon} from "@mui/material";
import UserContext from "../../context/userContext";

function Achievements():JSX.Element {
  const [achievements, setAchievements] = useState<Achievement[]>()

  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    const fetchAchievements = async () => {
      const res = await axios.get<Achievement[]>("http://localhost:8000/api/achievements/get/",
        { headers: { "Authorization": "Bearer " + userData.token } },)
      setAchievements(res.data)
    }
    fetchAchievements().catch(console.error)
  }, [userData]);

  const displayStars = (numberOfStars: number) => {
    let stars = []
    for (let i = 0; i < numberOfStars; i+=1) {
      stars.push(
        <SvgIcon key={i} component={StarIcon}/>
      )
    }
    return stars
  }

  return (
    <div className={"profile__achievements"}>
      {
        achievements != undefined ?
          achievements?.map(({current_tier, total_tiers, goal})=>(
            <div key={goal.description} className={"profile__achievement"}>
              <div>{displayStars(current_tier)}</div>
              <p className={"text--large"}><b>{goal.description}</b></p>
              <p>{goal.progress} / {goal.quantity}</p>
              {
                goal.quantity > goal.progress ?
                  <></> :
                  <p style={{color: "#FF4D00"}}>Maximum reached</p>
              }
            </div>
          )) :
          <div>Loading your achievements</div>
      }
    </div>
  )
}

export default Achievements