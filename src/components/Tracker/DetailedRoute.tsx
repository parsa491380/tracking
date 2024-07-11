import { Box, Card, Typography } from "@mui/material";
import React from "react";
import UTurnRightIcon from "@mui/icons-material/UTurnRight";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TurnSlightRightIcon from "@mui/icons-material/TurnSlightRight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnSlightLeftIcon from "@mui/icons-material/TurnSlightLeft";
import StraightIcon from "@mui/icons-material/Straight";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import "../../Assets/Styles/DetailedRoute.css";
import { Polyline } from "react-leaflet";

export default function DetailedRoute(item) {
 const leg = item.item.legs[0];
 let help;

 console.log(item.item);

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

 return (
  <>
   {leg.steps.map((step) => {
    let positions: number[] = [];

    step.geometry.coordinates.map((item: number[]) => {
     help = [item[1], item[0]];
     positions.push(help);
    });

    return (
     <>{positions ? <Polyline positions={positions} color="blue" /> : null}</>
    );
   })}

   <Box>
    <Card variant="outlined" id="header" sx={{ border: "2px solid blue" }}>
     <Typography> your trip will pass from : {leg.summary}</Typography>
     <Typography> duration : {leg.duration} seconds </Typography>
     <Typography> distance : {leg.distance} meters</Typography>
    </Card>
    {leg.steps.map((step, index) => {
     if (step.distance === 0) {
      //  console.log(step.distance === 0 && step.maneuver.modifier);

      return (
       <Card className="card">
        <Typography className="typo">
         {" "}
         you reached to your destination =))))))
        </Typography>
       </Card>
      );
     } else if (index === 0) {
      console.log(!step.maneuver.modifier);

      return (
       <Card className="card">
        <Typography className="typo">
         {" "}
         start your trip from {step.name}{" "}
         {step.maneuver.modifier ? (
          <>
           {"and then go :"} <br />{" "}
           <IconProvider item={step.maneuver.modifier} />
          </>
         ) : null}
        </Typography>
       </Card>
      );
     } else {
      return (
       <Card className="card">
        <Typography className="typo">
         move {step.distance} meters in {step.name} and then go : <br />
         {"  "}
         <IconProvider item={step.maneuver.modifier} />
        </Typography>
       </Card>
      );
     }
    })}
   </Box>
  </>
 );
}
