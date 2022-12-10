import {useMemo, useState} from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function Map() {
  const [coordinates, setCoordinates] = useState<any>()

  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const newMarker = useMemo(() => ({ lat: 50, lng: -80 }), []);

  return (
    <>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        onClick={(e) => {(setCoordinates([e.latLng?.toJSON()]))}}
      >
        <Marker label={"Home"} position={center} />
        <Marker position={newMarker} />
      </GoogleMap>
      <>{<>{console.log(coordinates)}</>}</>
    </>
  );
}

export default Map