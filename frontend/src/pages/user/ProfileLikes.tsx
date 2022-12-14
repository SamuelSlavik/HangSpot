/*
* author: Samuel Slávik (xslavi37)
* brief: Handling of liking posts
*/

import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {Like} from "../../types/interfaces";
// global context
import UserContext from "../../context/userContext";
// icons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {SvgIcon} from "@mui/material";

// function properties
export interface ProfileLikesProps {
  id: number,
};

function ProfileLikes({id}: ProfileLikesProps):JSX.Element {
  // state
  const [likes, setLikes] = useState<Like>()
  // global context
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/spots/likes/" + id,
          { headers: { "Authorization": "Bearer " + userData.token } })
        setLikes(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchLikes()
  }, [])

  return (
    <div className={"spot-likes"}>
      <p><b>{likes?.likes}</b>&nbsp;&nbsp;</p><SvgIcon component={ThumbUpOutlinedIcon}/>
    </div>
  )
}

export default ProfileLikes