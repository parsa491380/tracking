import L, { Icon } from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, Polyline, Popup, useMap, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import axios from "axios";

export default function GetLocByClick() {
  const [firstLoc, setFirstLoc] = useState<LatLng | null>(null);
  const [secondLoc, setSecondtLoc] = useState<LatLng | null>(null);
  const [data, setData] = useState([]);
  // const map = useMap();
  useEffect(() => {
    console.log("Map clicked at first console:", firstLoc);
    console.log("Map clicked at 2 console:", secondLoc);
  }, [firstLoc, secondLoc]);

  useMapEvents({
    click: (e) => {
      if (firstLoc === null) {
        setFirstLoc(e.latlng);
      } else if (secondLoc === null) {
        setSecondtLoc(e.latlng);
        // routeFinding();
      }
    },
  });

  const routeFinding = () => {
    const route = [firstLoc, secondLoc];
    console.log(route);

    axios.put(`http://localhost:8000/data/1`, { route }).then((res) => {
      console.log(res.data);
      RouteMaker();
    });
  };

  const RouteMaker = () => {
    axios.get("http://localhost:8000/data").then((response) => {
      setData(response.data[0].route);
      console.log("my lat long is succsessfulllllllll");
      console.log(response.data[0].route);
      // map.flyTo(firstLoc);
      // mapRef.current.flyToBounds(data[0]);
    });
  };

  const endLocIcon = new Icon({
    iconUrl:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/point-3298337-2761106.png?f=webp&w=256",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -20],
  });

  const startLocIcon = new Icon({
    iconUrl:
      "https://cdn.iconscout.com/icon/free/png-512/free-destination-43-267540.png?f=webp&w=256",
    iconSize: [40, 40],
    iconAnchor: [20, 32],
    popupAnchor: [0, -30],
  });

  return (
    <>
      {firstLoc ? (
        <Marker position={firstLoc} icon={startLocIcon}>
          <Popup> مبدا </Popup>
        </Marker>
      ) : null}
      {secondLoc ? (
        <Marker position={secondLoc} icon={endLocIcon}>
          <Popup> مقصد </Popup>
        </Marker>
      ) : null}
      {/* {data ? <Polyline positions={data} color="red" /> : null} */}
    </>
  );
}
