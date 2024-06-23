import React, { createContext, useRef, useState } from "react";
import { L } from "leaflet";
import {
  MapContainer,
  Polyline,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";
import FullScreenBotton from "./components/FullScreenBotton.tsx";
import MultyTileLayer from "./components/MultyTileLayer.tsx";
import DeviceLocation from "./components/DeviceLocation.tsx";
// import axios from "axios";
import AdressTextField from "./components/AdressTextField.tsx";
export const RouteContext = createContext();

function App() {
  // const mapRef = useRef(null);

  const position = [35.68744237931978, 51.38374328613281]; // [latitude, longitude]
  const [activeOclick, setActiveOclick] = useState(true);
  const [destination, setDestination] = useState(null);
  const [startLocGeter, setStartLocGeter] = useState(false);
  const [destinationLocGeter, setDestinationLocGeter] = useState(false);
  const [openDelIcon, setOpenDelIcon] = useState(false);

  // const routeFinding = () => {
  //   const route = [startLoc, destination];
  //   console.log(route);

  //   axios.put(`http://localhost:8000/data/1`, { route }).then((res) => {
  //     console.log(res.data);
  //     RouteMaker();
  //   });
  // };

  // const RouteMaker = () => {
  //   axios.get("http://localhost:8000/data").then((response) => {
  //     setData(response.data[0].route);
  //     console.log(response.data[0].route);
  //     setOpenDelIcon(true);
  //     // mapRef.current.flyToBounds(data[0]);
  //   });
  // };

  // Disable map click when clicking on a specific component inside the map container

  // var map = L.map("map").setView([51.505, -0.09], 13);

  // // Add a click event listener to the component inside the map container
  // var component = document.getElementById("component");
  // component.addEventListener("click", function (event) {
  //   // Prevent the click event from propagating to the map
  //   event.stopPropagation();
  // });

  // // Add a click event listener to the map to prevent click event if component is clicked
  // map.on("click", function (event) {
  //   if (!event.originalEvent._stopped) {
  //     console.log("Map clicked");
  //   }
  // });

  const aaa = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <RouteContext.Provider value={{ setActiveOclick }}>
        <MapContainer
          // ref={mapRef}
          center={position}
          zoom={12}
          zoomControl={false}
          minZoom={4}
          scrollWheelZoom={true}
          style={{
            width: "100%",
            height: "100vh",
            zIndex: "1",
          }}
        >
          <AdressTextField onClick={aaa} />
          <DeviceLocation />
          <FullScreenBotton />
          <ZoomControl position={"bottomright"} />
          <ScaleControl imperial={false} position="bottomright" />
          <MultyTileLayer />
        </MapContainer>
      </RouteContext.Provider>
    </>
  );
}

export default App;
