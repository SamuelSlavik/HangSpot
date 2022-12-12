import React, {useContext, useEffect, useMemo, useState} from "react"
import axios from "axios";
import {useParams, Link, useNavigate} from "react-router-dom"

import UserContext from "../../context/userContext";

import {CoordinatesInterface, Spot, Type} from "../../types/interfaces"
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import Login from "../user/Login";

// FUnction begining

function CreatePlace():JSX.Element {
  const [name, setName] = useState<string>()
  const [coordinates, setCoordinates] = useState<CoordinatesInterface>({lat: 0, lng: 0})
  const [spot_type, setSpot_Type] = useState<string>()
  const [description, setDescription] = useState()

  const navigate = useNavigate();

  const [allTypes, setAllTypes] = useState<Type[]>([])

  const latitude = useMemo(() => (coordinates.lat), [coordinates])
  const longitude = useMemo(() => (coordinates.lng), [coordinates])

  const {userData, setUserData} = useContext(UserContext)

  const owner = useMemo(() => (userData.id), [userData])

  const newMarker = useMemo(() => ({ lat: coordinates.lat , lng: coordinates.lng }), [coordinates]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA71RHhLabJaCTd4oYQwZGAcF2Luxcnf5s",
  });

  const [spot, setSpot] = useState<Spot>()

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/spots/types/")
        setAllTypes(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchTypes().catch(console.error)
  }, [])

  const submit = async (e: any) => {
    e.preventDefault()
    const headers = {
      "Authorization": "Bearer " + userData.token,
      "Content-Type": "application/json",
    };
    try {
      const createRes = await axios.post(
        "http://localhost:8000/api/spots/create/",
        {name, spot_type, owner, latitude, longitude},
        {headers: headers}
      )
    } catch (e) {
      console.log(e)
    }
    navigate("/")
  }

  return (
    <>
      <div className={"spot"}>
        <div className={"spot__map"}>
          {
            (!isLoaded) ? <div>Loading...</div> :
              <GoogleMap
                zoom={13}
                center={coordinates.lat && coordinates.lng ? undefined : {lat: 49.19578860752985, lng: 16.606112965870675}}
                mapContainerClassName="spot__map-inner"
                onClick={(e) => (
                  e.latLng ?
                    setCoordinates({lat: e.latLng?.lat(), lng: e.latLng?.lng()}) :
                    null
                )}
              >
                {coordinates.lat && coordinates.lng ? <Marker position={newMarker}/> : <></>}
              </GoogleMap>
          }
        </div>
        <div className={"spot__content"}>
          <h2>Zadajte veci</h2>
          <form>
            <input
              type={"text"}
              className={"input"}
              id={"createName"}
              placeholder={"Name"}
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
            <input
              type={"submit"}
              className={"input"}
              id={"createName"}
              placeholder={"Name"}
              value={"create"}
              onClick={submit}
            />
            <select onChange={(e) => {setSpot_Type(e.target.value)}}>
              {
                allTypes.map(({type_name, display_name}) => (
                  <option value={type_name}>
                    {display_name}
                  </option>
                ))
              }
            </select>

          </form>
        </div>
        <>{console.log(userData.id)}</>
      </div>

    </>
  )
}

export default CreatePlace