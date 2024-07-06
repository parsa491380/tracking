import React, { createContext, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Polyline,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";
import { LatLng } from "leaflet";
import FullScreenBotton from "./components/FullScreenBotton.tsx";
import MultyTileLayer from "./components/MultyTileLayer.tsx";
import DeviceLocation from "./components/DeviceLocation.tsx";
import AdressTextField from "./components/AdressTextField.tsx";
import RouteFindingMenu from "./components/RouteFindingMenu.tsx";
import L from "leaflet";
export const RouteContext = createContext();

function App() {
  const position = [35.68744237931978, 51.38374328613281]; // [latitude, longitude]
  const [activeOnclick, setActiveOnclick] = useState(true);
  const [firstLoc, setFirstLoc] = useState(null);
  const [secondLoc, setSecondtLoc] = useState(null);

  // const ref = useRef(null);
  // React.useEffect(() => {
  //   if (ref.current) {
  //     L.DomEvent.disableClickPropagation(ref.current);
  //     L.DomEvent.disableScrollPropagation(ref.current);
  //   }
  // }, []);

  return (
    <>
      <RouteContext.Provider
        value={{
          activeOnclick,
          setActiveOnclick,
          firstLoc,
          setFirstLoc,
          secondLoc,
          setSecondtLoc,
        }}
      >
        <MapContainer
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
          <MultyTileLayer />
          <DeviceLocation />
          <FullScreenBotton />
          <ZoomControl position={"bottomright"} />
          <ScaleControl imperial={false} position="bottomright" />
          <AdressTextField />
          <RouteFindingMenu />
        </MapContainer>
      </RouteContext.Provider>
    </>
  );
}

export default App;
