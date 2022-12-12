import React, {useEffect, useState} from "react"
import axios from "axios";
import {useParams, Link} from "react-router-dom"

import {Spot} from "../../types/interfaces"
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

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
        <h2>{spot?.name}</h2>
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
        <br/>
        {
          !spot?.description ?
            <></> :
            <>
              <p>Description:</p>
              <p style={{marginBottom: 0}} className={"text--large"}>{spot?.description}</p>
            </>
        }
      </div>
    </div>
  )
}

export default PlaceDetail