import React, { useEffect } from "react";
import UTurnRightIcon from "@mui/icons-material/UTurnRight";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TurnSlightRightIcon from "@mui/icons-material/TurnSlightRight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import StraightIcon from "@mui/icons-material/Straight";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Box, Card, Typography } from "@mui/material";
import { Marker, Polyline, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "../../Assets/Styles/DetailedRoute.css";

export default function DetaiedRouteOptions(prop) {
 const step = prop.prop.step;
 const index = prop.prop.index;
 const hover = prop.prop.hover;

 let help;
 const map = useMap();
 let positions: LatLngExpression[] = [];

 step.geometry.coordinates.map((item: number[]) => {
  help = [item[1], item[0]];
  positions.push(help);
 });

 const focusView = () => {
  map.setView(positions[positions.length - 1], 16);
  prop.prop.setHover(index);
 };

 const IconProvider = (props) => {
  let item = props.item;
  if (item === "uturn") {
   return (
    <>
     <UTurnRightIcon /> {"    "}
     {item}
    </>
   );
  } else if (item === "sharp right") {
   return (
    <>
     <RotateRightIcon /> {"    "}
     {item}
    </>
   );
  } else if (item === "right") {
   return (
    <>
     <TurnRightIcon /> {"    "}
     {item}
    </>
   );
  } else if (item === "slight right") {
   return (
    <>
     <TurnSlightRightIcon /> {"    "}
     {item}
    </>
   );
  } else if (item === "straight") {
   return (
    <>
     <StraightIcon />
     {"    "} {item}
    </>
   );
  } else if (item === "slight left") {
   return (
    <>
     <TurnSlightLeftIcon />
     {"    "} {item}
    </>
   );
  } else if (item === "left") {
   return (
    <>
     <TurnLeftIcon /> {"    "}
     {item}
    </>
   );
  } else if (item === "sharp left") {
   return (
    <>
     <RotateLeftIcon />
     {"    "} {item}
    </>
   );
  }
 };

 const Generator = () => {
  if (index === 0) {
   return (
    <div>
     <Box className="gapBox" />

     <Card
      className="card"
      onClick={focusView}
      sx={hover === index ? { border: "3px solid rgb(5, 191, 248) " } : null}
     >
      <Typography className="typo">
       start your trip from {step.name}{" "}
       {step.maneuver.modifier ? (
        <>
         {"and then go :"} <br /> <IconProvider item={step.maneuver.modifier} />
        </>
       ) : null}
      </Typography>
     </Card>
    </div>
   );
  } else if (step.distance === 0) {
   return (
    <div>
     <Card
      className="card"
      onClick={focusView}
      sx={hover === index ? { border: "3px solid rgb(5, 191, 248) " } : null}
     >
      <Typography className="typo">
       you reached to your destination =))))))
      </Typography>
     </Card>
     <Box sx={{ height: " 30px" }} />
    </div>
   );
  } else {
   return (
    <div>
     <Card
      className="card"
      onClick={focusView}
      sx={hover === index ? { border: "3px solid rgb(5, 191, 248) " } : null}
     >
      <Typography className="typo">
       move {step.distance} meters in {step.name} and then go : <br />
       <IconProvider item={step.maneuver.modifier} />
      </Typography>
     </Card>
    </div>
   );
  }
 };

 let markerIcon = new L.Icon({
  iconUrl:
   "https://cdn.iconscout.com/icon/premium/png-512-thumb/point-3298337-2761106.png?f=webp&w=256",
  iconSize: [10, 10],
  iconAnchor: [5, 5],
  popupAnchor: [0, -20],
 });
 let selectedMarkerIcon = new L.Icon({
  iconUrl:
   "https://cdn.iconscout.com/icon/premium/png-512-thumb/place-8280344-6820742.png?f=webp&w=256",
  iconSize: [40, 40],
  iconAnchor: [20, 35],
  popupAnchor: [0, -20],
 });

 useEffect(() => {}, [hover]);
 return (
  <>
   <Generator />
   {hover || positions ? (
    <Polyline
     positions={positions}
     //  color={hover ? "red" : "blue"}
     color="blue"
    />
   ) : null}
   <Marker
    eventHandlers={{
     click: () => {
      focusView();
     },
    }}
    position={positions[positions.length - 1]}
    icon={hover === index ? selectedMarkerIcon : markerIcon}
   />
  </>
 );
}
