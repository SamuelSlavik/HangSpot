/*
* author: Samuel Slávik (xslavi37)
* brief: displaying one thumbnail image for given post from list on posts on profile
 */

import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
// structures
import {Image} from "../../types/interfaces";
// global context
import UserContext from "../../context/userContext";
// images
import imagePlaceholder from "../../assets/images/land.png"

// function properties
export interface SpotThumbnailProps {
  id: number,
};

function SpotThumbnail({id}: SpotThumbnailProps):JSX.Element {
  const { userData, setUserData } = useContext(UserContext);

  const [imageData, setImageData] = useState<Image>()

  const fetchImages = async () => {
    try {
      const response = await axios.get<Image>("http://localhost:8000/api/spots/image/get/" + id,)
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
      {
        imageData?.image_url ?
          <img alt={"Image"} src={imageData?.image_url} /> :
          <img alt={"Image"} src={imagePlaceholder}  />
      }
    </>
  )
}

export default SpotThumbnail