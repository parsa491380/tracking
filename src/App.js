import React, { createContext, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  ScaleControl,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import MultyTileLayer from "./components/MultyTileLayer.tsx";
import LocationButton from "./components/LocationButton.tsx";
import GetLocByClick from "./components/GetLocByClick.tsx";
import DeviceLocation from "./components/DeviceLocation.tsx";
import DestinationPicker from "./components/DestinationPicker.tsx";
import axios from "axios";
import AdressTextField from "./components/AdressTextField.tsx";
import StartPicker from "./components/StartPicker.tsx";
export const RouteContext = createContext();

function App() {
  const mapRef = useRef(null);
  const startLocIcon = new Icon({
    iconUrl:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/location-3091991-2574351.png?f=webp&w=256",
    iconSize: [45, 45], // size of the icon
    iconAnchor: [20, 40],
  });
  const destinationIcon = new Icon({
    iconUrl:
      "https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png",
    iconSize: [60, 60], // size of the icon
    iconAnchor: [30, 50],
  });

  const position = [35.68744237931978, 51.38374328613281]; // [latitude, longitude]
  const [data, setData] = useState([]);
  const [startLoc, setStartLoc] = useState(null);
  const [destination, setDestination] = useState(null);
  const [startLocGeter, setStartLocGeter] = useState(false);
  const [destinationLocGeter, setDestinationLocGeter] = useState(false);
  const [openLocMenu, setOpenLocMenu] = useState(false);
  const [openDelIcon, setOpenDelIcon] = useState(false);

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

  const handleDelRout = () => {
    setData(null);
    setDestination(null);
    setStartLoc(null);
    setOpenDelIcon(false);
  };
  // console.log(startLoc);
  // console.log(destination);
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
          style={{
            width: "100%",
            height: "100vh",
            zIndex: "1",
          }}
        >
          {startLocGeter ? <StartPicker /> : null}
          {openLocMenu === true ? <GetLocByClick /> : null}

          {destinationLocGeter ? <DestinationPicker /> : null}
          {startLoc ? (
            <Marker position={startLoc} icon={startLocIcon}>
              <Popup> مبدا </Popup>
            </Marker>
          ) : null}
          {destination ? (
            <Marker position={destination} icon={destinationIcon}>
              <Popup>
                {" "}
                <h2> مقصد </h2>
              </Popup>
            </Marker>
          ) : null}
          {startLoc && destination ? (
            <button
              onClick={routeFinding}
              style={{
                position: "absolute",
                bottom: "30px",
                right: "45%",
                zIndex: "9999999999",
                color: "blue",
                width: "8%",
                height: "50px",
                backgroundColor: "bisque",
                borderRadius: "35px",
              }}
            >
              آغاز مسیر یابی
            </button>
          ) : null}
          {openDelIcon ? (
            <button
              onClick={handleDelRout}
              style={{
                position: "absolute",
                bottom: "30px",
                right: "35%",
                zIndex: "9999999999",
                color: "blue",
                width: "8%",
                height: "50px",
                backgroundColor: "bisque",
                borderRadius: "35px",
              }}
            >
              حذف مسیر پیدا شده
            </button>
          ) : null}
          {data ? <Polyline positions={data} color="red" /> : null}
          <MultyTileLayer />
          <AdressTextField />
          <DeviceLocation />
          <ZoomControl
            position={"bottomright"}
            style={{ borderRadius: "10%", backgroundColor: "#0ab6ff" }}
          />

          <ScaleControl imperial={false} position="bottomright" />
        </MapContainer>
      </RouteContext.Provider>
    </>
  );
}

export default App;
