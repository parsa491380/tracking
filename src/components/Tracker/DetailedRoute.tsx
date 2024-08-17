import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import "../../Assets/Styles/DetailedRoute.css";
import DetaiedRouteOptions from "./DetaiedRouteOptions.tsx";
export default function DetailedRoute(item) {
 const [hover, setHover] = useState();
 const leg = item.item.legs[0];

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
   <Box sx={{ position: "absolute", top: "270px" }}>
    <Card variant="outlined" id="header" sx={{ border: "2px solid blue" }}>
     <Typography> your trip will pass from : {leg.summary}</Typography>
     <Typography> duration : {duration} </Typography>
     <Typography> distance : {Math.round(leg.distance / 1000)} Km</Typography>
    </Card>
    {leg.steps.map((step, index) => {
     return (
      <DetaiedRouteOptions
       prop={{ step, index, hover, setHover }}
       key={index}
      />
     );
    })}
   </Box>
  </>
 );
}
