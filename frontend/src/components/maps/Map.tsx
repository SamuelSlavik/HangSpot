import {useContext, useEffect, useMemo, useState} from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import {Link, useNavigate} from "react-router-dom";

import {Spot} from "../../types/interfaces"
import axios from "axios";

import SearchContext from "../../context/searchContext";

function Map() {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState<any>()

  const center = useMemo(() => ({ lat: 49.19578860752985, lng: 16.606112965870675 }), []);
  const newMarker = useMemo(() => ({ lat: 50, lng: -80 }), []);

  const [spots, setSpots] = useState<Spot[]>([])

  const {searchType} = useContext(SearchContext)

  useEffect(() => {
    console.log(searchType)
    const fetchData = async () => {
      try {
        const response = await axios.get<Spot[]>("http://localhost:8000/api/spots/filter/" + searchType)
        setSpots(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData().catch(console.error)
  },[searchType])

  return (
    <>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
        onClick={(e) => {(setCoordinates([e.latLng?.toJSON()]))}}
      >
        <Marker label={"Home"} position={center}/>
        <Marker position={newMarker} />

        {
          !spots.length ?
            <></> :
            spots.map(({id, name, latitude, longitude}) => (
              <Link key={id} to={"/a"}>
                <Marker
                  key={id}
                  title={name}
                  position={{ lat: latitude, lng: longitude }}
                  onClick={() => navigate("/detail/" + id)}
                />
              </Link>
              )
            )
        }
      </GoogleMap>
      <>{console.log(spots)}</>
    </>
  );
}

export default Map