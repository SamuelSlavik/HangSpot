import React, {useEffect, useState} from "react"
import axios from "axios";
import {useParams, Link} from "react-router-dom"

import {Spot} from "../../types/interfaces"
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {SvgIcon} from "@mui/material";

function PlaceDetail():JSX.Element {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA71RHhLabJaCTd4oYQwZGAcF2Luxcnf5s",
  });

  const { id } = useParams()
  const [coordinates, setCoordinates] = useState({ lat: 49.19578860752985, lng: 16.606112965870675 })
  const [spot, setSpot] = useState<Spot>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/spots/get/" + id)
        setSpot(response.data)
        setCoordinates({lat: response.data.latitude, lng: response.data.longitude})
      } catch (e) {
        console.log(e)
      }
    }
    fetchData().catch(console.error)
  }, [])

  const like = async () => {
    try {
      const likeRes = await axios.post("")
    } catch (e) {
      console.log(e)
    }
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
          >
            <Marker position={coordinates} />
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
                <a onClick={like}><SvgIcon component={ThumbUpOutlinedIcon} fontSize={"large"}/></a>
              </div>
              <p className={"coordinate"}>Latitude: {spot?.latitude}</p>
              <p className={"coordinate"}>Longitude: {spot?.longitude}</p>
              <br/>
              <p style={{marginBottom: 0}}>Category:</p>
              <p style={{marginTop: 0}} className={"text--large"}><b>{spot?.spot_type}</b></p>
              <div className={"spot__display-flex"}>
                <div>
                  <p style={{marginBottom: 0}}>Created by:</p>
                  <Link to={"/user/" + spot?.owner.id} style={{marginTop: 0}} className={"text--large"}><b>{spot?.owner.username}</b></Link>
                </div>
                <div>
                  <p style={{marginBottom: 0}}>People liked:</p>
                  <p style={{marginTop: 0}} className={"text--large"}><b>{spot?.likes}</b></p>
                </div>
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
                !spot?.park_near ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Parking options:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot?.park_description}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.seating_provided ?
                  <></> :
                  <>
                    <p className={"text--large"}>Seating nearby provided</p>
                  </>
              }
              {
                !spot?.type_specific_data?.guarded ?
                  <></> :
                  <>
                    <p className={"text--large"}>Guarded</p>
                  </>
              }
              {
                !spot?.type_specific_data?.guard_free_time ?
                  <></> :
                  <>
                    <p className={"text--large"}>Guarded</p>
                  </>
              }
              {
                !spot?.type_specific_data?.guarded ?
                  <></> :
                  <>
                    <p className={"text--large"}>{spot.type_specific_data.guard_free_time}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.open_time ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Opened from:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.type_specific_data.open_time}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.close_time ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Closed from:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.type_specific_data.close_time}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.expected_duration ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Expected duration:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.type_specific_data.expected_duration}</p>
                  </>
              }
              {
                !spot?.type_specific_data?.close_time ?
                  <></> :
                  <>
                    <p style={{marginBottom: 0}}>Path description:</p>
                    <p style={{marginTop: 0}} className={"text--large"}>{spot.type_specific_data.path_description}</p>
                  </>
              }
            </>
        }
      </div>
    </div>
  )
}

export default PlaceDetail