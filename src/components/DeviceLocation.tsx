import React, { useState } from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { Marker, Popup, useMap } from "react-leaflet";
import { LatLng } from "leaflet";

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
      <button
        onClick={handleClick}
        style={{
          margin: 0,
          padding: 0,
          position: "absolute",
          bottom: "120px",
          right: "15px",
          zIndex: "9999999999",
          color: "white",
          width: "27px",
          height: "27px",
          backgroundColor: "#0ab6ff",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <GpsFixedIcon
          style={{
            margin: 0,
            paddingTop: 2,
            color: "white",
            width: "16px",
            height: "16px",
          }}
        />
      </button>
      {position === null ? null : (
        <Marker position={position}>
          <Popup
          // open={true}
          >
            You are here
          </Popup>
        </Marker>
      )}
    </>
  );
}
