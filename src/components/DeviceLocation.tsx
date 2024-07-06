import React, { RefAttributes, useState } from "react";

import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { Marker, MarkerProps, Popup, useMap } from "react-leaflet";
import { LatLng, Icon } from "leaflet";
import L from "leaflet";

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
      // alert("aaa");
    });
  };
  const startLocIcon = new Icon({
    iconUrl:
      "https://static-00.iconduck.com/assets.00/person-pin-circle-icon-417x512-ex8n0giz.png",
    iconSize: [30, 30],
    iconAnchor: [20, 32],
    popupAnchor: [0, -30],
  });

  return (
    <>
      <button id="button" onClick={handleClick} onDoubleClick={handleClick}>
        <GpsFixedIcon id="icon" />
      </button>
      {position === null ? null : (
        <Marker position={position} icon={startLocIcon} id="locIcon">
          <Popup>You are here</Popup>
        </Marker>
      )}
    </>
  );
}
