import { Icon } from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export default function GetLocByClick() {
  const [firstLoc, setFirstLoc] = useState<LatLng | null>(null);
  const [secondLoc, setSecondtLoc] = useState<LatLng | null>(null);

  const a = (loc) => {
    if (firstLoc === null) {
      setFirstLoc(loc);
      console.log("a");
    } else {
      setSecondtLoc(loc);
      console.log("b");
    }
    // console.log(firstLoc);
    // console.log(secondLoc);
  };

  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.on("click", (e) => {
      // setFirstLoc(e.latlng);
      // console.log(firstLoc);
      a(e.latlng);
    });
  }, [map, firstLoc]);
  const startLocIcon = new Icon({
    iconUrl:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/point-3298337-2761106.png?f=webp&w=256",
    iconSize: [20, 20],
    iconAnchor: [200, 40],
  });

  return (
    <>
      {firstLoc ? (
        <Marker position={firstLoc} icon={startLocIcon}>
          <RadioButtonCheckedIcon />
          <Popup> مبدا </Popup>
        </Marker>
      ) : null}
      {secondLoc ? (
        <Marker position={secondLoc} icon={startLocIcon}>
          <RadioButtonCheckedIcon />
          <Popup> مقصد </Popup>
        </Marker>
      ) : null}
    </>
  );
}
