import React, { createContext, useState } from "react";
import { MapContainer, ScaleControl, ZoomControl } from "react-leaflet";
import FullScreenBotton from "./components/FullScreen/FullScreenBotton.tsx";
import MultyTileLayer from "./components/LayerChanger/MultyTileLayer.tsx";
import DeviceLocation from "./components/CurentLocation/DeviceLocation.tsx";
import AdressTextField from "./components/Search&Menu/AdressTextField.tsx";
import RouteFindingMenu from "./components/Tracker/RouteFindingMenu.tsx";

export const RouteContext = createContext<number[] | null>(null);

function App() {
 const position: number[] = [35.68744237931978, 51.38374328613281]; // [latitude, longitude]
 const [firstLoc, setFirstLoc] = useState<number[] | null>(null);
 const [secondLoc, setSecondtLoc] = useState<number[] | null>(null);
 const [data, setData] = useState(null);
 const [selectedRoute, setSelectedRoute] = useState<number>(0);
 const [routingType, setRoutingType] = useState("car");

 return (
  <>
   <RouteContext.Provider
    value={{
     firstLoc,
     setFirstLoc,
     secondLoc,
     setSecondtLoc,
     data,
     setData,
     selectedRoute,
     setSelectedRoute,
     routingType,
     setRoutingType,
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
