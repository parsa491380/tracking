import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DetailedRoute from "./DetailedRoute.tsx";
import Typography from "@mui/material/Typography";
import { Polyline } from "react-leaflet";
import { RouteContext } from "../../App.tsx";
import "../../Assets/Styles/RouteDisplayer.css";

export default function RouteDisplayer() {
 const [routingDetailEnable, setRoutingDetailEnable] = useState<boolean>(false);

 // impost of variables from app.tsx context ;
 const { firstLoc, secondLoc, data, selectedRoute, setSelectedRoute } =
  useContext(RouteContext);

 // the check of the data , visually in the console ;

 // the main part of rendered component that will be maped into the return part ;
 const Options = (route) => {
  // simplification of the adrees and refrense of the object ;
  let index = route.route.index;
  let item = route.route.item;

  // nessecary function beacause OSRM object sends lnglat object ( revers of latlng )
  let positions: number[] = [];
  let help;
  item.geometry.coordinates.map((item: number[]) => {
   help = [item[1], item[0]];
   positions.push(help);
  });

  // extraction and collect of the important way points of the routs from summary obj of the response ;
  let text: string[] = [];
  text.push(item.legs[0].summary);

  // transform the recived duration in terms of seconds to the standard form of hour and minutes and seconds ;
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
  const duration = secondsToHms(item.duration);

  const routeDetail = () => {
   setRoutingDetailEnable(true);
   positions = [];
  };

  // just for checking commit

  return (
   <>
    {!routingDetailEnable ? (
     <Box
      id="Box"
      key={index}
      onClick={() => {
       setSelectedRoute(index);
      }}
     >
      <Card
       variant="outlined"
       id="Card"
       sx={
        selectedRoute === index
         ? { border: "4px solid blue" }
         : { border: "4px solid #ff004c59" }
       }
      >
       <CardContent>
        <Typography
         variant="h5"
         component="div"
         style={
          selectedRoute === index ? { color: "blue" } : { color: "#ff004c59" }
         }
        >
         number {index + 1} priority :
        </Typography>
        <Typography
         sx={{ mb: 1.5 }}
         style={
          selectedRoute === index ? { color: "blue" } : { color: "#ff004c59" }
         }
         fontSize="larg"
         color="text.secondary"
        >
         <br />
         distance to destination :{Math.round(item.distance / 1000)}
         kilometers
         <br />
         duration time : {duration}
        </Typography>
        <Typography
         variant="body2"
         sx={{ m: 0, p: 0, height: "40px", overflow: "hidden" }}
        >
         important points of the way : <br />
         {text}
        </Typography>
       </CardContent>
       <CardActions>
        <Button className="btn" size="large" onClick={routeDetail}>
         <span className="btn-text-one">Start Trip </span>
         <span className="btn-text-two">Lets Go!</span>
        </Button>
       </CardActions>
      </Card>
     </Box>
    ) : null}
    {routingDetailEnable && selectedRoute === index ? (
     <>
      <DetailedRoute item={item} />
     </>
    ) : null}

    {positions ? (
     <Polyline
      positions={positions}
      color={selectedRoute === index ? "#0400ff" : "#ff004c73"}
     />
    ) : null}

    {firstLoc !== null && secondLoc !== null && data !== null ? (
     <Polyline
      positions={[
       [firstLoc.lat, firstLoc.lng],
       [positions[0][0], positions[0][1]],
      ]}
      color="green"
      alt="my poly line"
     />
    ) : null}
    {firstLoc !== null && secondLoc !== null && data !== null ? (
     <Polyline
      positions={[
       positions[positions.length - 1],
       [secondLoc.lat, secondLoc.lng],
      ]}
      color="green"
      alt="my poly line"
     />
    ) : null}
   </>
  );
 };

 return (
  <>
   {data !== null
    ? data.map((item, index) => {
       return <Options route={{ item, index }} />;
      })
    : null}
  </>
 );
}
