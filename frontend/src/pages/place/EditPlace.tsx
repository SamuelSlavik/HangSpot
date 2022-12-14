/*
* author: Adam Pekný (xpekny00)
* brief: Generate user interface for editing already existing spots
*/

import React, {useContext, useEffect, useMemo, useState} from "react"
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom"
import TimeInput from "react-input-time";
// structures and modules
import {CoordinatesInterface, Image, Like, Spot, SpotDetail, Type} from "../../types/interfaces"
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
// icons
import {SvgIcon} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
// global context
import UserContext from "../../context/userContext";
import ReloadContext from "../../context/reloadContext";

function EditPlace():JSX.Element {
  // state
  const [spot, setSpot] = useState<Spot>()
  const [imagesData, setImagesData] = useState<Image[]>()

  const [name, setName] = useState<string>()
  const [coordinates, setCoordinates] = useState<CoordinatesInterface>({lat: 0, lng: 0})
  const [spot_type, setSpot_Type] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [park_near, setPark_near] = useState<boolean>()
  const [parking_description, setParking_description] = useState<string>()
  const [seating_provided, setSeating_provided] = useState<boolean>()
  const [images, setImages] = useState<any>({})
  const [guarded, setGuarded] = useState<boolean>()
  const [guard_free_from, setGuard_free_from] = useState<string>("0:00")
  const [guard_free_till, setGuard_free_till] = useState<string>("0:00")
  const [open_time, setOpen_time] = useState<string>("0:00")
  const [close_time, setClose_time] = useState<string>("0:00")
  const [expected_duration, setExpected_duration] = useState<number>()
  const [path_description, setPath_description] = useState<string>()
  // global context
  const {userData} = useContext(UserContext)
  const {forceReload, setForceReload} = useContext(ReloadContext)

  const latitude = useMemo(() => (coordinates.lat), [coordinates])
  const longitude = useMemo(() => (coordinates.lng), [coordinates])
  const owner = useMemo(() => (userData.id), [userData])
  const newMarker = useMemo(() => ({ lat: (coordinates.lat ? coordinates.lat : 0) , lng: (coordinates.lng ? coordinates.lng : 0) }), [coordinates]);

  const navigate = useNavigate();
  const { id } = useParams()

  const fetchImages = async () => {
    try {
      const response = await axios.get<Image[]>("http://localhost:8000/api/spots/images/get/" + id,
        { headers: { "Authorization": "Bearer " + userData.token } })
      setImagesData(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteImage = async (imageId:any) => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/spots/image/destroy/" + imageId + "/",
      )
    } catch (e:any) {
      console.log(e)
      alert(e.response.data.detail)
    }
    fetchImages().catch(console.error)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SpotDetail>("http://localhost:8000/api/spots/get/" + id)
        setSpot(response.data)
        setCoordinates({lat: response.data.latitude, lng: response.data.longitude})
        setName(response.data.name)
        setSpot_Type(response.data.spot_type.type_name)
        setDescription(response.data.description)
        setPark_near(response.data.park_near)
        setParking_description(response.data.park_description)
        setSeating_provided(response.data.seating_provided)
        setGuarded(response.data.guarded)
        setGuard_free_from(response.data.guard_free_from ? response.data.guard_free_from : "")
        setGuard_free_till(response.data.guard_free_till ? response.data.guard_free_till : "")
        setOpen_time(response.data.open_time ? response.data.open_time : "")
        setClose_time(response.data.close_time ? response.data.close_time : "")
        setExpected_duration(response.data.expected_duration)
        setDescription(response.data.path_description)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData().catch(console.error)
    fetchImages().catch(console.error)
  }, [userData])

  const submit = async (e: any) => {
    e.preventDefault()
    const headers = {
      "Authorization": "Bearer " + userData.token,
      "Content-Type": "application/json",
    };
    try {
      if (spot_type === "picnic" || "sunset") {
        const createRes:any = await axios.patch(
          "http://localhost:8000/api/spots/get/" + id + "/",
          {name, spot_type, owner, latitude, longitude, description, park_near, parking_description, seating_provided},
          {headers: headers}
        )
        setForceReload(forceReload + 1)
        const imagesRes:any = await axios.post(
          "http://localhost:8000/api/spots/images/update/" + createRes.data.id + "/",
          {images},
          { headers: {
              "Authorization": "Bearer " + userData.token,
              "Content-Type": "multipart/form-data",
            }
          }
        )
      } else if (spot_type === "bmx" || "skateboard") {
        const createRes:any = await axios.patch(
          "http://localhost:8000/api/spots/get/" + id + "/",
          {name, spot_type, owner, latitude, longitude, description, park_near, parking_description, guarded, guard_free_from, guard_free_till, open_time, close_time, expected_duration, path_description},
          {headers: headers}
        )
        setForceReload(forceReload + 1)
        const imagesRes:any = await axios.post(
          "http://localhost:8000/api/spots/images/update/" + createRes.data.id + "/",
          {images},
          { headers: {
              "Authorization": "Bearer " + userData.token,
              "Content-Type": "multipart/form-data",
            }
          }
        )
      } else {
        const createRes:any = await axios.patch(
          "http://localhost:8000/api/spots/get/" + id + "/",
          {name, spot_type, owner, latitude, longitude, description, park_near, parking_description, expected_duration, path_description},
          {headers: headers}
        )
        setForceReload(forceReload + 1)
        const imagesRes:any = await axios.post(
          "http://localhost:8000/api/spots/images/update/" + createRes.data.id + "/",
          {images},
          { headers: {
              "Authorization": "Bearer " + userData.token,
              "Content-Type": "multipart/form-data",
            }
          }
        )
      }
    } catch (e) {
      console.log(e)
    }
    navigate("/")
  }

  // google maps api
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyA71RHhLabJaCTd4oYQwZGAcF2Luxcnf5s",
  });
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
                options={styles}
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
          <p>Latitude: {coordinates.lat ? coordinates.lat : ""}</p>
          <p>Longitude: {coordinates.lng ? coordinates.lng : ""}</p>
          <br/>
          <form onSubmit={submit}>
            <input
              type={"text"}
              className={"input"}
              id={"createName"}
              placeholder={spot?.name}
              value={name}
              required
              onChange={(e) => {setName(e.target.value)}}
            />
            <select
              className={"input"}
              required
              onChange={(e) => {setSpot_Type(e.target.value)}}
            >
              <option value={spot?.spot_type.type_name}>
                {spot?.spot_type.display_name}
              </option>
            </select>
            <textarea
              name={"description"}
              id={"createDescription"}
              className={"input"}
              value={description}
              placeholder={"Description"}
              onChange={(e) => {setDescription(e.target.value)}}
            />
            <div>
              <label htmlFor={"createImages"}>Add images</label>
              <br/>
              <input
                className={"input"}
                type="file"
                id={"createImages"}
                multiple
                // @ts-ignore
                onChange={(e) => setImages( [...e.target.files] )}
              />
            </div>
            <div>
              <input
                type={"checkbox"}
                id={"createPark_near"}
                className={"input input-checkbox"}
                checked={park_near}
                onChange={event => {setPark_near(event.target.checked);
                  if(park_near) {
                    {setParking_description('')}
                  }
                }}
              />
              <label htmlFor={"createPark_near"}>Parking near ?</label>
            </div>
            {
              park_near ?
                <textarea
                  id={"createParking_description"}
                  className={"input"}
                  value={parking_description}
                  placeholder={"Parking description"}
                  onChange={(e) => {setParking_description(e.target.value)}}
                /> :
                <></>
            }
            {
              spot_type === "picnic" || spot_type === "sunset" ?
                <div>
                  <input
                    type={"checkbox"}
                    id={"createSeating-provided"}
                    className={"input input-checkbox"}
                    checked={seating_provided}
                    onChange={event => {setSeating_provided(event.target.checked)}}
                  />
                  <label htmlFor={"createSeating-provided"}>Seating provided ?</label>
                </div> :
                <></>
            }
            {
              spot_type === "bmx" || spot_type === "skateboard" ?
                <div>
                  <input
                    type={"checkbox"}
                    id={"createGuarded"}
                    className={"input input-checkbox"}
                    checked={guarded}
                    onChange={event => {setGuarded(event.target.checked);
                      if(guarded) {
                        setGuard_free_from("")
                        setGuard_free_till("")
                      }}}
                  />
                  <label htmlFor={"createGuarded"}>Guarded ?</label>
                </div> :
                <></>
            }
            {
              ((spot_type === "bmx" || spot_type === "skateboard") && guarded) ?
                <div>
                  <label htmlFor={"createGuard_free_from"}>Guard free from: </label>
                  <br/>
                  <TimeInput
                    className="input"
                    id={"createGuard_free_from"}
                    initialTime={guard_free_from}
                    onChange={event => {setGuard_free_from(event.target.value);}}
                  />
                </div> :
                <></>
            }
            {
              ((spot_type === "bmx" || spot_type === "skateboard") && guarded) ?
                <div>
                  <label htmlFor={"createGuard_free_till"}>Guard free till: </label>
                  <br/>
                  <TimeInput
                    className="input"
                    id={"createGuard_free_till"}
                    initialTime={guard_free_till}
                    onChange={event => {setGuard_free_till(event.target.value);}}
                  />
                </div> :
                <></>
            }
            {
              spot_type === "bmx" || spot_type === "skateboard" ?
                <div>
                  <label htmlFor={"createOpen_time"}>Opened from: </label>
                  <br/>
                  <TimeInput
                    className="input"
                    id={"createOpen_time"}
                    initialTime={open_time}
                    onChange={event => {setOpen_time(event.target.value)}}
                  />
                </div> :
                <></>
            }
            {
              spot_type === "bmx" || spot_type === "skateboard" ?
                <div>
                  <label htmlFor={"createClose_time"}>Closed from: </label>
                  <br/>
                  <TimeInput
                    className="input"
                    id={"createClose_time"}
                    initialTime={close_time}
                    onChange={event => {setClose_time(event.target.value)}}
                  />
                </div> :
                <></>
            }
            {
              spot_type === "walk" ?
                <input
                  type={"number"}
                  className={"input"}
                  id={"createExpected_time"}
                  placeholder={"Expected duration in hours"}
                  value={expected_duration}
                  onChange={(e) => {setExpected_duration(parseFloat(e.target.value))}}
                /> :
                <></>
            }
            {
              spot_type === "walk" ?
                <textarea
                  id={"createPath_description"}
                  className={"input"}
                  value={path_description}
                  placeholder={"Path description"}
                  onChange={(e) => {setPath_description(e.target.value)}}
                /> :
                <></>
            }
            <div className={"spot__images"}>
              {
                !imagesData ?
                  <></>  :
                  imagesData.map(({id, image_url}) => (
                    <div key={id} className={"images--small"}>
                      <a onClick={() => deleteImage(id)} className={"image-delete"}><SvgIcon component={DeleteIcon} fontSize={"large"}/></a>
                      <img className={""} id={"image" + id} alt={"Image"} src={image_url}/>
                    </div>
                  ))
              }
            </div>
            <br/>
            <br/>
            <br/>
            <input
              type={"submit"}
              className={"submit"}
              id={"createName"}
              placeholder={"Name"}
              value={"Update Spot"}
            />
          </form>
        </div>
        <>{console.log(images)}</>
      </div>
    </>
  )
}

export default EditPlace