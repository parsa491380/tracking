import React, { useContext, useRef } from "react";
import { useMap } from "react-leaflet";
import { RouteContext } from "../App";

export default function DestinationPicker() {
  const { setDestination, setDestinationLocGeter, setOpenLocMenu } =
    useContext(RouteContext);
  const map = useMap();

  const getDestination = () => {
    if (map) {
      const center = map.getCenter();
      console.log(center);
      setDestination([center.lat, center.lng]);
      setDestinationLocGeter(false);
    }
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: 1000,
          position: "relative",
        }}
      >
        <img
          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/location-2630905-2176133.png?f=webp&w=256"
          alt="Location Image"
          style={{
            width: "40px",
            height: "40px",
            position: "absolute",
            top: "45%",
            left: "48.8%",
          }}
        />

        <button
          onClick={getDestination}
          style={{
            position: "absolute",
            bottom: "30px",
            right: "45%",
            zIndex: "9999999999",
            color: "white",
            width: "8%",
            height: "50px",
            backgroundColor: "rgb(234, 0, 255)",
            borderRadius: "35px",
          }}
        >
          انتخاب مقصد
        </button>
      </div>
    </>
  );
}
