import React, {useContext, useEffect, useMemo, useState} from "react"
import {GoogleMap, Marker, useLoadScript, Polyline} from "@react-google-maps/api";
import axios from "axios";
import {CoordinatesInterface, Image, Like, Result, SpotDetail, SpotFinderSpot} from "../../types/interfaces";
import UserContext from "../../context/userContext";
import MapContext from "../../context/mapContext";
import {useParams} from "react-router-dom"

function SpotFinder():JSX.Element {
  const { isLoaded } = useContext(MapContext)

  const { id } = useParams()
  const [coordinates, setCoordinates] = useState<CoordinatesInterface>({lat: undefined, lng: undefined})

  const [resultCoordinates, setResultCoordinates] = useState<CoordinatesInterface>({lat: undefined, lng: undefined})

  const [spot, setSpot] = useState<SpotFinderSpot>()
  const [likes, setLikes] = useState<Like>()
  const [imagesData, setImagesData] = useState<Image[]>()

  const latitude = useMemo(() => (coordinates.lat), [coordinates])
  const longitude = useMemo(() => (coordinates.lng), [coordinates])

  const [result, setResult] = useState<Result|undefined>(undefined)

  const { userData, setUserData } = useContext(UserContext);

  const newMarker = useMemo(() => ({ lat: (coordinates.lat ? coordinates.lat : 0) , lng: (coordinates.lng ? coordinates.lng : 0) }), [coordinates]);
  const resultMarker = useMemo(() => ({ lat: (resultCoordinates.lat ? resultCoordinates.lat : 0) , lng: (resultCoordinates.lng ? resultCoordinates.lng : 0) }), [resultCoordinates]);

  const[spot_id, setSpot_id] = useState<number>()

  const fetchData = async () => {
    try {
      const response = await axios.get<SpotFinderSpot>("http://localhost:8000/api/games/question/spotfinder/")
      setSpot(response.data)
      setSpot_id(response.data.id)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData().catch(console.error)
  }, [])

  const submitGuess = async(e:any) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:8000/api/games/result/spotfinder/",
        {latitude, longitude, spot_id},
      { headers: { "Authorization": "Bearer " + userData.token } }
      )
      setResult(response.data)
      setResultCoordinates({lat: response.data.real_coordinates.latitude, lng: response.data.real_coordinates.longitude})

    } catch (e) {
      console.log(e)
    }
  }

  const nextQuestion = async (e:any) => {
    e.preventDefault()
    setResult(undefined)
    setResultCoordinates({lat: undefined, lng:undefined})
    setCoordinates({lat: undefined, lng: undefined})
    fetchData().catch(console.error)
  }

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
  const displayIcon = (color:string)=>{
    let icon =  "https://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
    return icon
  }


  return (
    <div className={"spot-finder"}>
      <div className={"spot-finder__map"}>
        {
          (!isLoaded) ? <div>Loading...</div> :
            <GoogleMap
              zoom={13}
              center={
                resultCoordinates.lat && resultCoordinates.lng ?
                  {lat: resultCoordinates.lat, lng: resultCoordinates.lng} :
                coordinates.lat && coordinates.lng ? undefined : {lat: 49.19578860752985, lng: 16.606112965870675}
              }
              mapContainerClassName="spot-finder__map-inner"
              options={styles}
              onClick={(e) => (
                e.latLng ?
                  !result ? setCoordinates({lat: e.latLng?.lat(), lng: e.latLng?.lng()}) : null :
                  null
              )}
            >
              {coordinates.lat && coordinates.lng ? <Marker position={newMarker}/> : <></>}
              {resultCoordinates.lat && resultCoordinates.lng ? <Marker position={resultMarker}/> : <></>}
              {resultCoordinates.lat && resultCoordinates.lng ? <Polyline path={[newMarker, resultMarker]}/>  : <></>}
            </GoogleMap>
        }
      </div>
      <div className={"spot-finder__content"}>
        <p className={"text--large spot-finder__tutorial"}>
          <b>
          Guess where the location of the spot below.<br/>
          Confirm your guess via submit button.
          </b>
        </p>
        {
          result ?
            <></> :
            <form onSubmit={submitGuess}>
              <input
                type={"submit"}
                className={"submit"}
                id={"spotFinderSubmit"}
                value={"Submit guess"}
              />
            </form>
        }
        {
          result ?
            <form onSubmit={nextQuestion}>
              <input
                type={"submit"}
                className={"submit"}
                id={"spotFinderNext"}
                value={"Next spot"}
              />
            </form> :
            <></>
        }
        {
          result ?
            <div className={"spot-finder__result"}>
              <p className={"text--large"}>
                POINTS EARNED<br/>
                <span className={"text--orange"}><b>{result?.points}</b> </span>
              </p>
              <p>
                Distance from the spot<br/>
                <span className={"text--orange"}><b>{result?.distance}km</b></span>
              </p>
            </div> :
            <></>
        }
        <h2>{spot?.name}</h2>
        <p style={{marginBottom: 0}}>Category:</p>
        <p style={{marginTop: 0}} className={"text--large"}><b>{spot?.type}</b></p>
        {
          !spot?.description ?
            <></> :
            <>
              <p style={{marginBottom: 0}}>Description:</p>
              <p style={{marginTop: 0}} className={"text--large"}>{spot?.description}</p>
            </>
        }
        <img alt={"image"} src={spot?.image}/>
      </div>
    </div>
  )
}

export default SpotFinder