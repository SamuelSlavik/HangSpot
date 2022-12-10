import {useMemo, useState} from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function Map() {
  const [coordinates, setCoordinates] = useState<any>()

  const center = useMemo(() => ({ lat: 49.19578860752985, lng: 16.606112965870675 }), []);
  const newMarker = useMemo(() => ({ lat: 50, lng: -80 }), []);

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
      </GoogleMap>
      <>{<>{console.log(coordinates)}</>}</>
    </>
  );
}

export default Map