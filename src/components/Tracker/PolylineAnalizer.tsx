import React, { useContext, useEffect, useState } from "react";
import { RouteContext } from "../../App.tsx";
import axios from "axios";
import RouteDisplayer from "./RouteDisplayer.tsx";
import { CircularProgress } from "@mui/material";
import type context from "../../Types/context.ts";

export default function PolylineAnalizer(reverser) {
 const { firstLoc, secondLoc, data, setData, routingType } =
  useContext<context>(RouteContext);

 const routeGeter = () => {
  // the following is the standard format of OSRM for routing requests :

  //      /route/v1/{profile}/{coordinates}?alternatives={true|false|number}&steps={true|false}
  //      &geometries={polyline|polyline6|geojson}&overview={full|simplified|false}&annotations={true|false}
  //
  //
  //        profile can be car or bike or foot
  //        coordinates can be String of format  ( longitude,latitude;longitude,latitude ) or [{longitude},{latitude}; ...] or polyline({polyline}) or polyline6({polyline6}) .
  //          alternative can be true or false or the number of routes you want to find between two points (( if possible )).
  //          steps Returned route steps for each route leg and can be true or false (( defualt is false ))
  //        geometries Returned route geometry format (influences overview and per step) . can be polyline (default) , polyline6  or  geojson
  //        overview :  Add overview ( describtion ) geometry either full , simplified according to highest zoom level it could be display on, or not at all.
  //                      can be full , simplified or false
  //        annotations : can be 	true , false (default), nodes , distance , duration , datasources , weight , speed
  //                      Returns additional metadata for each coordinate along the route geometry.

  // here is an example of this standard format :

  // ("http://router.project-osrm.org/route/v1/car/13.388860,52.517037;13.397634,52.529407;13.428555,52.523219?alternatives=3&steps=true&geometries=polyline&overview=simplified&annotations=true");
  if (firstLoc !== null && secondLoc !== null && data === null) {
   axios
    .get(
     `http://router.project-osrm.org/route/v1/${routingType}/${firstLoc.lng},${firstLoc.lat};${secondLoc.lng},${secondLoc.lat}?alternatives=3&steps=true&geometries=geojson&overview=full&annotations=true`
    )
    .then((response) => {
     console.log(response.data);

     if (response.data.code === "Ok") {
      setData(response.data.routes);
     } else {
      alert(response.data.message);
     }
    });
  }
 };

 routeGeter();

 // neseccery for swap function of the higher component
 useEffect(() => {
  if (firstLoc && secondLoc && routingType) {
   routeGeter();
  }
 }, [firstLoc, routingType, reverser.reverser, data]);

 return (
  <>
   {firstLoc && secondLoc && !data ? (
    <CircularProgress
     sx={{
      m: "150px",
     }}
    />
   ) : null}
   {data ? <RouteDisplayer /> : null}
  </>
 );
}
