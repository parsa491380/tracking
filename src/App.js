import React, { createContext, useRef, useState } from "react";
import {
  MapContainer,
  Polyline,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";
import MultyTileLayer from "./components/MultyTileLayer.tsx";
// import { FullscreenControl } from "react-leaflet-fullscreen";
// // import "leaflet.fullscreen/Control.FullScreen.css";
import DeviceLocation from "./components/DeviceLocation.tsx";
import axios from "axios";
import AdressTextField from "./components/AdressTextField.tsx";
export const RouteContext = createContext();

function App() {
  const mapRef = useRef(null);
  // const startLocIcon = new Icon({
  //   iconUrl:
  //     "https://cdn.iconscout.com/icon/premium/png-512-thumb/location-3091991-2574351.png?f=webp&w=256",
  //   iconSize: [45, 45], // size of the icon
  //   iconAnchor: [20, 40],
  // });
  // const destinationIcon = new Icon({
  //   iconUrl:
  //     "https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png",
  //   iconSize: [60, 60], // size of the icon
  //   iconAnchor: [30, 50],
  // });

  const position = [35.68744237931978, 51.38374328613281]; // [latitude, longitude]
  const [data, setData] = useState([]);
  const [startLoc, setStartLoc] = useState(null);
  const [destination, setDestination] = useState(null);
  const [startLocGeter, setStartLocGeter] = useState(false);
  const [destinationLocGeter, setDestinationLocGeter] = useState(false);
  const [openDelIcon, setOpenDelIcon] = useState(false);
  const [openLocMenu, setOpenLocMenu] = useState(false);

  // const map = useMap();

  // useEffect(() => {
  //   // if (!map) return;

  //   map.on("click", (e) => {
  //     console.log(e.latlng);
  //   });
  // }, [map]);

  const routeFinding = () => {
    const route = [startLoc, destination];
    console.log(route);

    axios.put(`http://localhost:8000/data/1`, { route }).then((res) => {
      console.log(res.data);
      RouteMaker();
    });
  };

  const RouteMaker = () => {
    axios.get("http://localhost:8000/data").then((response) => {
      setData(response.data[0].route);
      console.log(response.data[0].route);
      setOpenDelIcon(true);
      // mapRef.current.flyToBounds(data[0]);
    });
  };

  // const handleDelRout = () => {
  //   setData(null);
  //   setDestination(null);
  //   setStartLoc(null);
  //   setOpenDelIcon(false);
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
          {data ? <Polyline positions={data} color="red" /> : null}
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
