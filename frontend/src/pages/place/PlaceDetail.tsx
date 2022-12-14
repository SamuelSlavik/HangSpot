import React, {useContext, useEffect, useMemo, useState} from "react"
import axios from "axios";
import {useParams, Link} from "react-router-dom"

import {Like, Spot, SpotForTheFuckinDetail} from "../../types/interfaces"
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {SvgIcon} from "@mui/material";
import UserContext from "../../context/userContext";

function PlaceDetail():JSX.Element {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA71RHhLabJaCTd4oYQwZGAcF2Luxcnf5s",
  });

  const { id } = useParams()
  const [coordinates, setCoordinates] = useState({ lat: 49.19578860752985, lng: 16.606112965870675 })
  const [spot, setSpot] = useState<SpotForTheFuckinDetail>()
  const [likes, setLikes] = useState<Like>()
  const [images, setImages] = useState<any>()

  const { userData, setUserData } = useContext(UserContext);

  const styles = useMemo(() => ({
    styles: [
      {
        featureType: "poi.business",
        stylers: [{visibility: "off"}]
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{visibility: "off"}]
      }
    ]
  }), []);

  const fetchLikes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/spots/likes/" + id,
        { headers: { "Authorization": "Bearer " + userData.token } })
      setLikes(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/spots/images/get/" + id,
        { headers: { "Authorization": "Bearer " + userData.token } })
      setImages(response.data)
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SpotForTheFuckinDetail>("http://localhost:8000/api/spots/get/" + id)
        setSpot(response.data)
        setCoordinates({lat: response.data.latitude, lng: response.data.longitude})
      } catch (e) {
        console.log(e)
      }
    }
    fetchData().catch(console.error)
    fetchLikes().catch(console.error)
    fetchImages().catch(console.error)
  }, [])

  const like = async () => {
    try {
      const likeRes = await axios.patch("http://localhost:8000/api/spots/likes/" + id + "/",
        {},
        { headers: { "Authorization": "Bearer " + userData.token } })
    } catch (e) {
      console.log(e)
    }
    fetchLikes().catch(console.error)
  }

  const displayIcon = (color:string)=>{
    let icon =  "https://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
    return icon
  }

  return (
    <div className={"spot"}>
      <div className={"spot__map"}>
        {
          (!isLoaded) ? <div>Loading...</div> :
          <GoogleMap
            zoom={13}
            center={coordinates}
            mapContainerClassName="spot__map-inner"
            options={styles}
          >
            {
              spot ?
                <Marker
                  position={coordinates}
                  icon={displayIcon(spot.spot_type.marker_color)}
                /> :
                <></>
            }
          </GoogleMap>
        }
      </div>
      <div className={"spot__content"}>
        {
          !spot ?
            <div>
              Loading data...
            </div> :
            <>
              <div className={"spot__header-wrapper"}>
                <h2>{spot?.name}</h2>
                {
                  likes?.user_in ?
                    <a onClick={like} style={{color: "#FF4D00"}}>
                      <SvgIcon component={ThumbUpOutlinedIcon} fontSize={"large"}/>
                    </a> :
                    <a onClick={like}>
                      <SvgIcon component={ThumbUpOutlinedIcon} fontSize={"large"}/>
                    </a>
                }
              </div>
              <p className={"coordinate"}>Latitude: {spot?.latitude}</p>
              <p className={"coordinate"}>Longitude: {spot?.longitude}</p>
              <br/>
              <p style={{marginBottom: 0}}>Category:</p>
              <p style={{marginTop: 0}} className={"text--large"}><b>{spot?.spot_type.display_name}</b></p>
              <div className={"spot__display-flex"}>
                <div>
                  <p style={{marginBottom: 0}}>Created by:</p>
                  <Link to={"/user/" + spot?.owner.id} style={{marginTop: 0}} className={"text--large"}><b>{spot?.owner.username}</b></Link>
                </div>
                {
                  !likes?.likes === undefined ?
                    <></> :
                    <div>
                      <p style={{marginBottom: 0}}>People liked:</p>
                      <p style={{marginTop: 0}} className={"text--large"}><b>{likes?.likes}</b></p>
                    </div>
                }
              </div>
              {
                !spot?.description ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Description:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot?.description}</p>
                  </>
              }
              {
                !images ?
                  <></>  :
                  <img alt={"Image"} src={images[0].image_url}/>
              }
              {
                !spot?.park_near ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Parking options:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot?.park_description}</p>
                  </>
              }
              {
                !spot?.seating_provided ?
                  <></> :
                  <>
                    <p className={"text--large"}>Seating nearby provided</p>
                  </>
              }
              {
                !spot?.guarded ?
                  <></> :
                  <>
                    <p className={"text--large"}>Guarded</p>
                  </>
              }
              {
                !spot?.guard_free_from ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Guard free from:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>Guarded</p>
                  </>
              }
              {
                !spot?.guard_free_till ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Guard free from:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.guard_free_till}</p>
                  </>
              }
              {
                !spot?.open_time ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Opened from:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.open_time}</p>
                  </>
              }
              {
                !spot?.close_time ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Closed from:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.close_time}</p>
                  </>
              }
              {
                !spot?.expected_duration ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Expected duration:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.expected_duration} hours</p>
                  </>
              }
              {
                !spot?.close_time ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Path description:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.path_description}</p>
                  </>
              }
            </>
        }
      </div>
      <>{console.log(images)}</>
    </div>
  )
}

export default PlaceDetail