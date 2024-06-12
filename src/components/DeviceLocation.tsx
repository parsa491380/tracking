import React, { useState } from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { Marker, Popup, useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import "./css/DeviceLocation.css";

export default function DeviceLocation() {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMap();
  map.locate();
  map.once("locationfound", (location) => {
    setPosition(location.latlng);
  });

  const handleClick = () => {
    map.locate();
    map.once("locationfound", (location) => {
      setPosition(location.latlng);
      map.flyTo(location.latlng);
    });
  };

  return (
    <>
      <button id="button" onClick={handleClick}>
        <GpsFixedIcon id="icon" />
      </button>
      {position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </>
  );
}
