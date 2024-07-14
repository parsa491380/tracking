import React, { useContext, useEffect } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { RouteContext } from "../../App.tsx";
import { IconButton, Snackbar } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function GetLocByClick(prop) {
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
    <Marker position={firstLoc} icon={prop.prop.startLocIcon}>
     <Popup> مبدا </Popup>
    </Marker>
   ) : null}
   {secondLoc ? (
    <Marker position={secondLoc} icon={prop.prop.endLocIcon}>
     <Popup> مقصد </Popup>
    </Marker>
   ) : null}
  </>
 );
}
