import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {Image} from "../../types/interfaces";
import UserContext from "../../context/userContext";

// function properties
export interface SpotThumbnailProps {
  id: number,
};

function SpotThumbnail({id}: SpotThumbnailProps):JSX.Element {
  const { userData, setUserData } = useContext(UserContext);

  const [imageData, setImageData] = useState<Image>()

  const fetchImages = async () => {
    try {
      const response = await axios.get<Image>("http://localhost:8000/api/spots/image/get/" + id,
        { headers: { "Authorization": "Bearer " + userData.token } })
      setImageData(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchImages().catch(console.error)
  }, []);

  return (
    <>
      <img alt={"Image"} src={imageData?.image_url} className={""} />
      <>{console.log(imageData)}</>
    </>
  )
}

export default SpotThumbnail