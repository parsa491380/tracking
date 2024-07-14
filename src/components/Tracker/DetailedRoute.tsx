import { Box, Card, IconButton, Typography } from "@mui/material";
import React from "react";
import L from "leaflet";
import "leaflet-plugin-trackplayback";
// import "leaflet-plugin-trackplayback/dist/leaflet.trackplayback.css";
// import "leaflet-plugin-trackplayback/dist/leaflet.trackplayback.min.js";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "../../Assets/Styles/DetailedRoute.css";
import DetaiedRouteOptions from "./DetaiedRouteOptions.tsx";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { useMap } from "react-leaflet";
export default function DetailedRoute(item) {
 const leg = item.item.legs[0];
 const map = useMap();
 console.log(item.item);
 const Options = {
  // the play options
  clockOptions: {
   // the default speed
   // caculate method: fpstime * Math.pow(2, speed - 1)
   // fpstime is the two frame time difference
   speed: 10,
   // the max speed
   maxSpeed: 10,
  },
  // trackPoint options
  trackPointOptions: {
   // whether draw track point
   isDraw: false,
   // whether use canvas to draw it, if false, use leaflet api `L.circleMarker`
   useCanvas: true,
   stroke: false,
   color: "#ef0300",
   fill: true,
   fillColor: "#ef0300",
   opacity: 0.3,
   radius: 4,
  },
  // trackLine options
  trackLineOptions: {
   // whether draw track line
   isDraw: true,
   stroke: true,
   color: "#1C54E2",
   weight: 2,
   fill: false,
   fillColor: "#000",
   opacity: 0.3,
  },
  // target options
  targetOptions: {
   // whether use image to display target, if false, the program provide a default
   useImg: true,
   // if useImg is true, provide the imgUrl
   imgUrl:
    "https://cdn.iconscout.com/icon/premium/png-512-thumb/arrow-1889418-1597463.png?f=webp&w=256",
   // the width of target, unit: px
   width: 8,
   // the height of target, unit: px
   height: 10,
   // the stroke color of target, effective when useImg set false
   color: "#00f",
   // the fill color of target, effective when useImg set false
   fillColor: "#9FD12D",
  },
 };

 let data = [];
 let help = {};
 let time = 1609459200;

 leg.steps.map((item) => {
  help = {
   lat: item.geometry.coordinates[0][1],
   lng: item.geometry.coordinates[0][0],
   time: time,
  };
  data.push(help);

  time = time + item.duration;
 });
 console.log(data);

 var trackPlayback = new L.TrackPlayback(map, data, Options);

 // Optional  (only if you need plaback control)
 //  const trackplaybackControl = L.trackplaybackcontrol(trackplayback);

 const startTrack = () => {
  trackPlayback.showTrack();
  trackPlayback.start();
 };
 const stopTrack = () => {
  trackPlayback.stop();
 };

 function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
 }
 const duration = secondsToHms(leg.duration);
 return (
  <>
   <Box>
    <Card variant="outlined" id="header" sx={{ border: "2px solid blue" }}>
     <Typography> your trip will pass from : {leg.summary}</Typography>
     <Typography> duration : {duration} </Typography>
     <Typography> distance : {Math.round(leg.distance / 1000)} Km</Typography>

     <IconButton>
      <PlayCircleIcon onClick={startTrack} />
      <PauseCircleFilledIcon onClick={stopTrack} />
     </IconButton>
    </Card>
    {leg.steps.map((step, index) => {
     return <DetaiedRouteOptions prop={{ step, index }} key={index} />;
    })}
   </Box>
  </>
 );
}
