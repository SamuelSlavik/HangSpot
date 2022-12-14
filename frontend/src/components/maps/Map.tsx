/*
* author:
*/

import {useContext, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// Google maps api
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
// Structures and modules
import {Spot} from "../../types/interfaces"
// Global context
import SearchContext from "../../context/searchContext";
import ReloadContext from "../../context/reloadContext";

function Map() {
  // State
  const [spots, setSpots] = useState<Spot[]>([])
  //Global context
  const {searchType} = useContext(SearchContext)
  const {forceReload, setForceReload} = useContext(ReloadContext)

  const navigate = useNavigate();

  const center = useMemo(() => ({ lat: 49.19578860752985, lng: 16.606112965870675 }), []);
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

  setTimeout(() => {
    setForceReload(forceReload + 1)
  }, 5000)

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

  // google maps marker styling
  const displayIcon = (color:string)=>{
    let icon =  "https://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png"
    return icon
  }

  return (
    <>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"
        options={styles}
      >
        {
          !spots.length?
            <></> :
            spots.map(({id, name, latitude, longitude, spot_type}) => (
            <Marker
              key={id}
              title={name}
              position={{ lat: latitude, lng: longitude }}
              onClick={() => navigate("/detail/" + id)}
              icon={displayIcon(spot_type.marker_color)}
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

