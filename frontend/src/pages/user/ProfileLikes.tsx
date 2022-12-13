import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {Like} from "../../types/interfaces";
import UserContext from "../../context/userContext";

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {SvgIcon} from "@mui/material";

export interface ProfileLikesProps {
  id: number,
};

function ProfileLikes({id}: ProfileLikesProps):JSX.Element {
  const [likes, setLikes] = useState<Like>()

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