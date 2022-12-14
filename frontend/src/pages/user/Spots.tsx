import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {Achievement, Spot} from "../../types/interfaces";

import {Link} from "react-router-dom"

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import {SvgIcon} from "@mui/material";

import UserContext from "../../context/userContext";
import ProfileLikes from "./ProfileLikes";

import imagePlaceholder from "../../assets/images/land.png"

function Spots():JSX.Element {
  const [spotsData, setSpotsData] = useState<Spot[]>()

  const { userData, setUserData } = useContext(UserContext);

  const fetchSpots = async () => {
    const res = await axios.get<Spot[]>("http://localhost:8000/api/spots/user/" + userData.id + "/",
      { headers: { "Authorization": "Bearer " + userData.token } },)
    setSpotsData(res.data)
  }

  const deleteSpot = async (id: any) => {
    try {
      const res = await axios.delete("http://localhost:8000/api/spots/destroy/" + id + "/",
        {headers: { "Authorization": "Bearer " + userData.token }} )
      fetchSpots().catch(console.error)
    } catch (e:any) {
      console.log(e)
      alert(e.response.data.detail)
    }
  }

  useEffect(() => {
    fetchSpots().catch(console.error)
  }, []);

  return (
    <div className={"profile__spots"}>
      {
        spotsData?
           spotsData.map(({name, description, id}) => (
             <div className={"profile__spot"}>
               <div className={"spot-image"}>
                 <img src={imagePlaceholder}/>
               </div>
               <div className={"spot-content"}>
                 <h2><Link to={"/detail/" + id}>{name}</Link></h2>
                 <p>{description}</p>
                 <br/>
                 <ProfileLikes id={id}/>
               </div>
               <div className={"spot-actions"}>
                 <p><Link to={"/edit/" + id}><SvgIcon component={CreateIcon}/></Link></p>
                 <p><a onClick={() => deleteSpot(id)}><SvgIcon component={DeleteIcon}/></a></p>
               </div>
             </div>
           )) :
          <div>Loading your spots</div>
      }
    </div>
  )
}

export default Spots