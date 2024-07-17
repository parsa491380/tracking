import React, { useRef, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SideMenu from "./SideMenu.tsx";
import "../../Assets/Styles/AdressTextField.css";
import L from "leaflet";
import { useMap } from "react-leaflet";
import axios from "axios";
import {
 Box,
 InputBase,
 List,
 ListItem,
 ListItemButton,
 ListItemText,
 Typography,
} from "@mui/material";
import type adressResponse from "../../Types/adressResponse.ts";

export default function AdressTextField() {
 const [position, setPosition] = useState(null);
 const [adress, setAdress] = useState<string>("");
 const [data, setData] = useState<adressResponse[] | null>(null);

 const map = useMap();

 const divRef = useRef(null);
 useEffect(() => {
  L.DomEvent.disableClickPropagation(divRef.current);
  L.DomEvent.disableScrollPropagation(divRef.current);
 }, [adress]);

 const routingDirectly = async () => {
  map.locate();
  map.once("locationfound", (location) => {
   setPosition(location.latlng);
  });

  // my personal API KEY  is : 66978130a068a775898956bsw7efe7a
  console.log(adress);

  await axios
   .get(
    `https://geocode.maps.co/search?q=${adress}&api_key=66978130a068a775898956bsw7efe7a `
   )
   .then((response) => {
    console.log(response.data);
    setData(response.data);
   });
 };

 const handleEnter = (e) => {
  if (e.key === "Enter") {
   routingDirectly();
  }
 };

 const RenderOptions = (item) => {
  const select = () => {
   setAdress(item.item.item.display_name);
  };
  return (
   <Typography onClick={select}> {item.item.item.display_name}</Typography>
  );
  //   return (
  //    <ListItem
  //     key={item.item.index}
  //     onClick={select}
  //     component="div"
  //     disablePadding
  //     sx={{ fontSize: "small" }}
  //    >
  //     <ListItemButton>
  //      <ListItemText primary={` ${item.item.item.display_name}`} />
  //     </ListItemButton>
  //    </ListItem>
  //   );
 };

 return (
  <>
   <Paper id="paperStyle" ref={divRef}>
    <SideMenu />
    <Box
    // onSubmit={(event) => {
    //  console.log("aaaa");
    //  event.preventDefault();

    //  routingDirectly();
    // }}
    >
     <InputBase
      id="input"
      placeholder="routing directly"
      type="search"
      value={adress}
      onKeyDown={handleEnter}
      inputProps={{ "aria-label": "search google maps" }}
      onChange={(e) => {
       setAdress(e.target.value);
      }}
     />
     <IconButton
      type="button"
      sx={{ p: "10px", color: "#0ab6ff" }}
      aria-label="search"
      onClick={routingDirectly}
     >
      <SearchIcon />
     </IconButton>
    </Box>
   </Paper>
   <Paper sx={{ width: 500 }}>
    {data !== null
     ? data.map((item, index) => {
        return <RenderOptions item={{ item, index }} key={index} />;
       })
     : null}
   </Paper>
  </>
 );
}
