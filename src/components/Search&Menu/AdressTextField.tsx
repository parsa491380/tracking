import React, {
 useRef,
 forwardRef,
 useEffect,
 useState,
 useContext,
 LegacyRef,
} from "react";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import SideMenu from "./SideMenu.tsx";
import L, { LatLng } from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";
import { Box, Button, InputBase, Typography } from "@mui/material";
import type adressResponse from "../../Types/adressResponse.ts";
import { RouteContext } from "../../App.tsx";
import context from "../../Types/context.ts";
import "../../Assets/Styles/AdressTextField.css";
import RouteFindingMenu from "../Tracker/RouteFindingMenu.tsx";

export default function AdressTextField() {
 const [position, setPosition] = useState<LatLng>();
 const [adress, setAdress] = useState<string>("");
 const [responseData, setResponseData] = useState<adressResponse[] | null>(
  null
 );
 const [openSideMenu, setOpenSideMenu] = React.useState(false);

 const { openLocMenu, setOpenLocMenu, setFirstLoc, setSecondtLoc, data } =
  useContext<context>(RouteContext);

 const map = useMap();

 const divRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);
 useEffect(() => {
  L.DomEvent.disableClickPropagation(divRef.current!);
  L.DomEvent.disableScrollPropagation(divRef.current!);
 }, [adress, position, data]);

 const routingDirectly = async () => {
  map.locate();
  map.once("locationfound", (location) => {
   setPosition(location.latlng);
  });

  // my personal API KEY  is : 66978130a068a775898956bsw7efe7a
  console.log(adress);
  console.log(position);

  await axios
   .get(
    `https://geocode.maps.co/search?q=${adress}&api_key=66978130a068a775898956bsw7efe7a `
   )
   .then((response) => {
    console.log(response.data);
    setResponseData(response.data);
   });
 };

 const handleEnter = (e) => {
  if (e.key === "Enter") {
   routingDirectly();
  }
 };

 const RenderOptions = (item) => {
  const select = () => {
   if (position) {
    setAdress(item.item.item.display_name);
    console.log(item);
    setFirstLoc(position);
    setSecondtLoc(
     L.latLng(parseFloat(item.item.item.lat), parseFloat(item.item.item.lon))
    );
    setOpenLocMenu(true);
    setResponseData(null);
    setAdress("");
   } else {
    alert(
     "sorry , we couldnt find your current location. please use the arrow botton to specify your start and destination location."
    );
   }
  };
  return (
   <Typography onClick={select} fontSize={14} className="options">
    {item.item.item.display_name}
   </Typography>
  );
 };

 return (
  <div ref={divRef}>
   <Paper
    id="paperStyle"
    sx={openSideMenu ? { left: "300px" } : null}
    style={openLocMenu ? { left: -500 } : undefined}
   >
    <SideMenu open={{ openSideMenu, setOpenSideMenu }} />
    <Box>
     <InputBase
      id="input"
      placeholder="routing directly"
      type="search"
      value={adress}
      onKeyDown={handleEnter}
      inputProps={{ "aria-label": "search google maps" }}
      onChange={(e) => {
       setAdress(e.target.value);
       //  console.log(e.target.value);
      }}
     />
     <Button type="button" aria-label="search" onClick={routingDirectly}>
      <SearchIcon className="SearchIcon" />
     </Button>
     <RouteFindingMenu prop={{ openSideMenu, setOpenSideMenu }} />
    </Box>
    {openLocMenu === false ? (
     <Paper id="optionsPaper">
      {responseData !== null && adress !== ""
       ? responseData.map((item, index) => {
          return <RenderOptions item={{ item, index }} key={index} />;
         })
       : null}
     </Paper>
    ) : null}
   </Paper>
  </div>
 );
}
