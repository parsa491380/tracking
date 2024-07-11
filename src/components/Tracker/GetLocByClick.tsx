import React, { useContext, useEffect } from "react";
import { Marker, Polyline, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { RouteContext } from "../../App.tsx";
import { Button, IconButton, Snackbar } from "@mui/material";
// import zIndex from "@mui/material/styles/zIndex";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
export default function GetLocByClick() {
 const [open, setOpen] = React.useState(false);
 const { firstLoc, setFirstLoc, secondLoc, setSecondtLoc } =
  useContext(RouteContext);

 const map = useMap();

 const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === "clickaway") {
   return;
  }

  setOpen(false);
 };

 const action = (
  <>
   <IconButton
    size="small"
    aria-label="close"
    color="inherit"
    sx={{ border: "2px solid aqua" }}
   >
    <ThumbUpIcon fontSize="small" />
   </IconButton>
  </>
 );

 useEffect(() => {}, [firstLoc, secondLoc]);
 useMapEvents({
  click: (event) => {
   //  L.DomEvent.disableScrollPropagation();
   setOpen(true);
   //  console.log(open);
   map.doubleClickZoom.disable();

   return;
  },
  dblclick: (event) => {
   if (firstLoc === null) {
    setFirstLoc(event.latlng);
   } else if (secondLoc === null) {
    setSecondtLoc(event.latlng);
   }
  },
 });

 let startLocIcon = new L.Icon({
  iconUrl:
   "https://cdn.iconscout.com/icon/premium/png-512-thumb/location-1889633-1597707.png?f=webp&w=256",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -20],
 });
 const endLocIcon = new L.Icon({
  iconUrl:
   "https://cdn.iconscout.com/icon/premium/png-512-thumb/location-2630805-2176233.png?f=webp&w=256",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -20],
 });
 return (
  <>
   <Snackbar
    sx={{
     zIndex: 99999999999,
     border: "1.5px solid aqua",
     borderRadius: "5px",
    }}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    open={open}
    onClick={handleClose}
    autoHideDuration={3000}
    onClose={handleClose}
    message="you have to double click the map to chose your selected location"
    action={action}
   />
   {firstLoc ? (
    <Marker position={firstLoc} icon={startLocIcon}>
     <Popup> مبدا </Popup>
    </Marker>
   ) : null}
   {secondLoc ? (
    <Marker position={secondLoc} icon={endLocIcon}>
     <Popup> مقصد </Popup>
    </Marker>
   ) : null}
  </>
 );
}
