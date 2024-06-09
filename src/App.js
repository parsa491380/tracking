import React, { createContext, useRef, useState } from "react";
import {
  MapContainer,
  Polyline,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";
import MultyTileLayer from "./components/MultyTileLayer.tsx";
import DeviceLocation from "./components/DeviceLocation.tsx";
import axios from "axios";
import AdressTextField from "./components/AdressTextField.tsx";
export const RouteContext = createContext();

function App() {
  const mapRef = useRef(null);

  const position = [35.68744237931978, 51.38374328613281]; // [latitude, longitude]
  const [startLoc, setStartLoc] = useState(null);
  const [destination, setDestination] = useState(null);
  const [startLocGeter, setStartLocGeter] = useState(false);
  const [destinationLocGeter, setDestinationLocGeter] = useState(false);
  const [openDelIcon, setOpenDelIcon] = useState(false);
  const [openLocMenu, setOpenLocMenu] = useState(false);

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

  return (
    <>
      <RouteContext.Provider
        value={{
          setStartLoc,
          setDestination,
          setStartLocGeter,
          setOpenLocMenu,
          setDestinationLocGeter,
          openLocMenu,
        }}
      >
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={12}
          zoomControl={false}
          minZoom={4}
          scrollWheelZoom={true}
          // fullscreenControl={true}
          style={{
            width: "100%",
            height: "100vh",
            zIndex: "1",
          }}
        >
          {openLocMenu === true ? (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                backgroundColor: "white ",
                width: "400px",
                height: "100vh",
                boxShadow: "100",
                zIndex: "100000",
              }}
            ></div>
          ) : null}
          {/* {data ? <Polyline positions={data} color="red" /> : null} */}
          <MultyTileLayer />
          <AdressTextField />
          <DeviceLocation />
          <ZoomControl position={"bottomright"} />
          {/* <fullscreenControl position={"bottomright"} /> */}
          <ScaleControl imperial={false} position="bottomright" />
        </MapContainer>
      </RouteContext.Provider>
    </>
  );
}

export default App;
