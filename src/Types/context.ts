import React from "react";
import { route } from "./response";
import { LatLng, LatLngExpression } from "leaflet";

type context = {
 openLocMenu: boolean;
 setOpenLocMenu: React.Dispatch<React.SetStateAction<boolean>>;
 firstLoc: LatLng | LatLngExpression | null;
 setFirstLoc: React.Dispatch<
  React.SetStateAction<LatLngExpression | LatLng | null>
 >;
 secondLoc: LatLngExpression | LatLng | null;
 setSecondtLoc: React.Dispatch<
  React.SetStateAction<LatLngExpression | LatLng | null>
 >;
 data: route[] | null;
 setData: React.Dispatch<React.SetStateAction<route[] | null>>;
 selectedRoute: number;
 setSelectedRoute: React.Dispatch<React.SetStateAction<number>>;
 routingType: string;
 setRoutingType: React.Dispatch<React.SetStateAction<string>>;
 routingDetailEnable: boolean;
 setRoutingDetailEnable: React.Dispatch<React.SetStateAction<boolean>>;
};
export default context;
