import {useContext, useEffect, useMemo, useState} from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import {Link, useNavigate} from "react-router-dom";

import {Spot} from "../../types/interfaces"
import axios from "axios";

import SearchContext from "../../context/searchContext";
import ReloadContext from "../../context/reloadContext";
import MapContext from "../../context/mapContext";

import PushPinIcon from '@mui/icons-material/PushPin';

import {useLoadScript} from "@react-google-maps/api";

function Map() {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState<any>()

  const center = useMemo(() => ({ lat: 49.19578860752985, lng: 16.606112965870675 }), []);

  const [spots, setSpots] = useState<Spot[]>([])

  const {searchType} = useContext(SearchContext)

  const {forceReload} = useContext(ReloadContext)

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
  },[searchType, forceReload])

  return (
    <>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
        onClick={(e) => {(setCoordinates([e.latLng?.toJSON()]))}}
      >
        {
          !spots.length?
            <></> :
            spots.map(({id, name, latitude, longitude}) => (
            <Marker
              key={id}
              title={name}
              position={{ lat: latitude, lng: longitude }}
              onClick={() => navigate("/detail/" + id)}
            />
              )
            )
        }
      </GoogleMap>
      <>{console.log(spots)}</>
    </>
  );
}

export default Map