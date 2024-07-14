import React, { useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SideMenu from "./SideMenu.tsx";
import "../../Assets/Styles/AdressTextField.css";
import L from "leaflet";
// import Test from "./Test.tsx";

export default function AdressTextField() {
 const divRef = useRef(null);
 useEffect(() => {
  L.DomEvent.disableClickPropagation(divRef.current);
  L.DomEvent.disableScrollPropagation(divRef.current);
 });
 return (
  <Paper component="form" id="paperStyle" ref={divRef}>
   <SideMenu />
   <input type="text" id="input" placeholder="Search Google Maps" />
   {/* <Test /> */}
   <IconButton
    type="button"
    sx={{ p: "10px", color: "#0ab6ff" }}
    aria-label="search"
   >
    <SearchIcon />
   </IconButton>
  </Paper>
 );
}
