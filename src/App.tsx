import React, { createContext, useState } from "react";
import { MapContainer, ScaleControl, ZoomControl } from "react-leaflet";
import FullScreenBotton from "./components/FullScreen/FullScreenBotton.tsx";
import MultyTileLayer from "./components/LayerChanger/MultyTileLayer.tsx";
import DeviceLocation from "./components/CurentLocation/DeviceLocation.tsx";
import AdressTextField from "./components/Search&Menu/AdressTextField.tsx";
import RouteFindingMenu from "./components/Tracker/RouteFindingMenu.tsx";
import type { route } from "./Types/response.ts";
import type context from "./Types/context.ts";
import { LatLngExpression } from "leaflet";

export const RouteContext = createContext<context>({
 firstLoc: null,
 setFirstLoc: () => {},
 secondLoc: null,
 setSecondtLoc: () => {},
 data: null,
 setData: () => {},
 openLocMenu: false,
 setOpenLocMenu: () => {},
 selectedRoute: 0,
 setSelectedRoute: () => {},
 routingType: "car",
 setRoutingType: () => {},
 routingDetailEnable: false,
 setRoutingDetailEnable: () => {},
});

function App() {
 const position = { lat: 35.68744237931978, lng: 51.38374328613281 }; // [latitude, longitude]

 const [firstLoc, setFirstLoc] = useState<LatLngExpression | null>(null);
 const [secondLoc, setSecondtLoc] = useState<LatLngExpression | null>(null);
 const [data, setData] = useState<route[] | null>(null);
 const [selectedRoute, setSelectedRoute] = useState<number>(0);
 const [routingType, setRoutingType] = useState("car");
 const [routingDetailEnable, setRoutingDetailEnable] = useState<boolean>(false);
 const [openLocMenu, setOpenLocMenu] = useState<boolean>(false);

 return (
  <>
   <RouteContext.Provider
    value={{
     firstLoc,

     setFirstLoc,
     secondLoc,
     setSecondtLoc,
     openLocMenu,
     setOpenLocMenu,
     data,
     setData,
     selectedRoute,
     setSelectedRoute,
     routingType,
     setRoutingType,
     routingDetailEnable,
     setRoutingDetailEnable,
    }}
   >
    <MapContainer
     center={position}
     zoom={12}
     doubleClickZoom={false}
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
    </MapContainer>
   </RouteContext.Provider>
  </>
 );
}

export default App;
