import { Icon } from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, Polyline, Popup, useMapEvents } from "react-leaflet";
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

  const sampleLatLng = [
    [35.44545865563933, 51.57528519630433],
    [35.44482934159093, 51.57624006271363],
    [35.445478321624066, 51.57692670822144],
    [35.44552202379514, 51.57727539539338],
    [35.44429835403538, 51.57823562622071],
    [35.442725037009005, 51.578873991966255],
    [35.44266385183677, 51.578884720802314],
    [35.44228362865257, 51.578895449638374],
    [35.44225303590451, 51.578852534294136],
    [35.442078219978285, 51.578863263130195],
    [35.442012663908066, 51.57884985208512],
    [35.44193399655332, 51.57909125089646],
    [35.43822124702195, 51.58023655414582],
    [35.43740830903077, 51.58041894435883],
    [35.43612551115023, 51.58030360937119],
    [35.43398382689588, 51.57865136861802],
    [35.43336753577023, 51.578265130519874],
    [35.43168473101401, 51.57643049955368],
    [35.43158419870761, 51.57611399888992],
    [35.431483666275696, 51.57576531171799],
    [35.43122577815905, 51.57575994729996],
    [35.43064006309747, 51.575497090816505],
    [35.43060946592495, 51.575475633144386],
    [35.42828404679758, 51.57332986593247],
    [35.42807860240603, 51.57306700944901],
    [35.427956209753475, 51.57278269529343],
    [35.427798847498316, 51.572718322277076],
    [35.427602144246976, 51.57289534807206],
    [35.427558432348114, 51.573024094104774],
    [35.42555640195491, 51.57408624887467],
    [35.425530174152286, 51.5740916132927],
    [35.42458159621727, 51.57432228326798],
    [35.42399146145064, 51.57306700944901],
    [35.423427550856374, 51.57343715429307],
    [35.423270179753416, 51.573029458522804],
    [35.42282429329208, 51.573297679424286],
    [35.4227281213788, 51.572975814342506],
    [35.42256200598546, 51.57266467809678],
  ];

  // const routeFinding = () => {
  //   const route = [firstLoc, secondLoc];
  //   console.log(route);

  //   axios.put(`http://localhost:8000/data/1`, { route }).then((res) => {
  //     console.log(res.data);
  //     RouteMaker();
  //   });
  // };

  // const RouteMaker = () => {
  //   axios.get("http://localhost:8000/data").then((response) => {
  //     setData(response.data[0].route);
  //     console.log("my lat long is succsessfulllllllll");
  //     console.log(response.data[0].route);
  //     // map.flyTo(firstLoc);
  //     // mapRef.current.flyToBounds(data[0]);
  //   });
  // };

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

      {firstLoc !== null && secondLoc !== null ? (
        <Polyline positions={sampleLatLng} color="red" alt="my poly line" />
      ) : null}
    </>
  );
}
